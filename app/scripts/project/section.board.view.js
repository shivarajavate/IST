
class SectionBoardView {
    constructor() {

        this.layer;
        this.x;
        this.y;
        this.w;
        this.h;
        this.uiSettings;

        this.boardViewRect;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.boards = [];
        this.noOfBoards = 0;
        this.noOfNotes = 0;

        this.isVisible = false;
        this.isLeftScrollable = false;
        this.isRightScrollable = false;
    }

    init(layer, x, y, w, h, uiSettings) {
        // Draw the outer box for BoardView (Konva Rect), display this!
        // Calculate #boards that can be displayed in a view & store in noOfBoards
        // Now create that many KonvaRect & KonvaText objects that represent 'a-board' in a loop
        // and store in boards object. Make them not-visible for now.
        this.layer = layer;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.uiSettings = {
            styles: uiSettings.styles["section"],
            properties: uiSettings.properties["section"],
            getConfig: uiSettings.getConfig["section"]
        };

        // Draw the outer box for BoardView (Konva Rect)
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: this.w,
            height: this.h
        };
        var config = this.uiSettings.getConfig(manualConfig, "boardViewRect");
        this.boardViewRect = new Konva.Rect(config);

        this.layer.add(this.boardViewRect);

        // Calculate #boards that can be displayed in a view & store in noOfBoards
        // Now create that many KonvaRect & KonvaText objects that represent 'a-board' in a loop
        // and store in boards object. Make them not-visible for now.
        var boardUISettings = {
            styles: uiSettings.styles["board"],
            properties: uiSettings.properties["board"],
            getConfig: uiSettings.getConfig["board"]
        };

        var bX = this.x;
        var bY = this.y;
        var bW = boardUISettings.properties.w + (boardUISettings.properties.minGapW * 2);
        var bH = boardUISettings.properties.h + (boardUISettings.properties.minGapH * 2);

        var cols = Math.floor(this.w / bW);
        var rows = Math.floor(this.h / bH);
        var newBW = (this.w / cols);
        var newBH = (this.h / rows);
        var newGapW = (newBW - boardUISettings.properties.w) / 2;
        var newGapH = (newBH - boardUISettings.properties.h) / 2;

        this.noOfBoards = (cols * rows);
        for (var i = 0; i < this.noOfBoards; ++i) {

            var colNo = (i % cols);
            var rowNo = Math.floor(i / cols);

            var x = bX + (colNo * newBW);
            var y = bY + (rowNo * newBH);
            var w = newBW;
            var h = newBH;
            var gapW = newGapW;
            var gapH = newGapH;

            this.boards[i] = new Board();
            this.boards[i].init(this.layer, x, y, w, h, gapW, gapH, uiSettings);
        }

        // Draw scrollLeftButton on top(left aligned) of the first board
        //  Setup scrollLeftButton display object in Konva
        var x = this.x;
        var y = this.y;
        var w = this.w;
        var h = this.h;
        if (this.boards.length > 0) {
            x = this.boards[0].x;
            y = this.boards[0].y;
            w = (this.boards[0].w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100));
            h = this.boards[0].h;
        }
        var manualConfig = {
            x: x,
            y: y,
            width: w,
            height: h
        };
        var config = this.uiSettings.getConfig(manualConfig, "scrollLeftButtonRect");
        this.scrollLeftButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: x,
            y: y,
            width: w,
            height: h
        };
        var config = this.uiSettings.getConfig(manualConfig, "scrollLeftButtonText");
        this.scrollLeftButtonText = new Konva.Text(config);

        this.layer.add(this.scrollLeftButtonRect);
        this.layer.add(this.scrollLeftButtonText);

        // Draw scrollRightButton on (right aligned) of the last board
        //  Setup scrollRightButton display object in Konva
        var x = this.x;
        var y = this.y;
        var w = this.w;
        var h = this.h;
        if (this.boards.length > 0) {
            x = this.boards[this.boards.length - 1].x;
            y = this.boards[this.boards.length - 1].y;
            w = (this.boards[this.boards.length - 1].w * (this.uiSettings.properties.scrollLeftButtonRect.wPct / 100));
            h = this.boards[this.boards.length - 1].h;
            x += (this.boards[this.boards.length - 1].w - w);
        }
        var manualConfig = {
            x: x,
            y: y,
            width: w,
            height: h
        };
        var config = this.uiSettings.getConfig(manualConfig, "scrollRightButtonRect");
        this.scrollRightButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: x,
            y: y,
            width: w,
            height: h
        };
        var config = this.uiSettings.getConfig(manualConfig, "scrollRightButtonText");
        this.scrollRightButtonText = new Konva.Text(config);

        this.layer.add(this.scrollRightButtonRect);
        this.layer.add(this.scrollRightButtonText);
    }

    leftmostBoard(withNote = false) {

        var boardView = this;

        switch (withNote) {
            case true:
                return boardView.boards.find(function (board) {
                    return (board.note !== null);
                });
                break;
            case false:
                return boardView.boards.find(function (board) {
                    return true;
                });
                break;
        }
    }

    rightmostBoard(withNote = false) {

        var boardView = this;

        var lastBoard = undefined;

        switch (withNote) {
            case true:
                boardView.boards.forEach(function (board) {
                    if (board.note) {
                        lastBoard = board;
                    }
                });
                break;
            case false:
                boardView.boards.forEach(function (board) {
                    lastBoard = board;
                });
                break;
        }

        return lastBoard;
    }

    displayNoteAt(boardId, newNote) {

        var boardView = this;

        if (boardId !== -1) {
            // Basically we are overwriting the note on this board
            boardView.boards[boardId].attachNote(newNote);
            boardView.boards[boardId].makeVisible(boardView.isVisible && true);
        }
    }

    displayNoteAtStart(newNote) {
        // Well, we are inserting a new note at the beginning
        // Move the note contents (if any) from the first board to second board and so on
        // Now attach this note to the first board

        // There are 3-scenarios
        // 1. No boards are filled
        // 2. Some boards are filled
        // 3. All boards are filled

        if (this.noOfNotes === 0) {
            // 1. No boards are filled
            this.displayNoteAt(0, newNote);
            ++this.noOfNotes;

        } else if (this.noOfNotes < this.noOfBoards) {
            // 2. Some boards are filled
            for (var i = this.noOfNotes - 1; i >= 0; --i) {
                this.boards[i + 1].attachNote(this.boards[i].note);
                this.boards[i + 1].makeVisible(this.isVisible && true);
            }
            this.displayNoteAt(0, newNote);
            ++this.noOfNotes;

        } else if (this.noOfNotes === this.noOfBoards) {
            // 3. All boards are filled
            for (var i = this.noOfNotes - 1; i >= 0; --i) {
                // Attach the note only if there is an adjacent board available 
                if (this.boards[i + 1]) {
                    this.boards[i + 1].attachNote(this.boards[i].note);
                    this.boards[i + 1].makeVisible(this.isVisible && true);
                }
            }
            this.displayNoteAt(0, newNote);
        }
    }

    displayNoteAtEnd(newNote) {
        // Well, we are appending a new note to the end
        // Move the note contents (if any) from the last board to last but one and so on
        // Now attach this note to the last board

        // There are 3-scenarios
        // 1. No boards are filled
        // 2. Some boards are filled
        // 3. All boards are filled

        if (this.noOfNotes < this.noOfBoards) {
            // 1. No boards are filled
            // 2. Some boards are filled
            this.displayNoteAt(this.noOfNotes, newNote);
            ++this.noOfNotes;

        } else if (this.noOfNotes === this.noOfBoards) {
            // 3. All boards are filled 
            for (var i = 0; i < (this.noOfNotes - 1); ++i) {
                this.boards[i].attachNote(this.boards[i + 1].note);
                this.boards[i].makeVisible(this.isVisible && true);
            }
            this.displayNoteAt((this.noOfNotes - 1), newNote);
        }
    }

    deleteNote(boardID) {
        // Unattach note from this board, ripple move any notes present after this board

        // 1. Unattach the note from the board
        this.boards[boardID].unattachNote();
        this.boards[boardID].makeVisible(this.isVisible && false);

        // 2. Move the empty note board to the end by shifting the notes present (if any) one by one
        for (var i = boardID; i < this.noOfNotes - 1; ++i) {
            this.boards[i].attachNote(this.boards[i + 1].note);
            this.boards[i].makeVisible(this.isVisible && true);

            this.boards[i + 1].unattachNote();
            this.boards[i + 1].makeVisible(this.isVisible && false);
        }

        // 3. Decrement the noOfNotes by 1 as the note is deleted now
        --this.noOfNotes;
    }

    clear() {

        var boardView = this;

        boardView.boards.forEach(function (board) {
            board.unattachNote();
            board.makeVisible(boardView.isVisible && false);
        });

        boardView.noOfNotes = 0;
    }

    selectBoard(boardId) {

        var boardView = this;

        boardView.boards.forEach(function (board, index) {

            board.unhighlightNote();

            if (index === boardId) {
                board.highlightNote();
            }
        });
    }

    unselectBoard() {

        var boardView = this;

        boardView.boards.forEach(function (board) {
            board.unhighlightNote();
        });
    }

    relocateAt(newX, newY) {

        this.boardViewRect.setX(newX + (this.boardViewRect.x() - this.x));
        this.boardViewRect.setY(newY + (this.boardViewRect.y() - this.y));

        this.scrollLeftButtonRect.setX(newX + (this.scrollLeftButtonRect.x() - this.x));
        this.scrollLeftButtonRect.setY(newY + (this.scrollLeftButtonRect.y() - this.y));
        this.scrollLeftButtonText.setX(newX + (this.scrollLeftButtonText.x() - this.x));
        this.scrollLeftButtonText.setY(newY + (this.scrollLeftButtonText.y() - this.y));

        this.scrollRightButtonRect.setX(newX + (this.scrollRightButtonRect.x() - this.x));
        this.scrollRightButtonRect.setY(newY + (this.scrollRightButtonRect.y() - this.y));
        this.scrollRightButtonText.setX(newX + (this.scrollRightButtonText.x() - this.x));
        this.scrollRightButtonText.setY(newY + (this.scrollRightButtonText.y() - this.y));

        for (var i = 0; i < this.noOfBoards; ++i) {

            this.boards[i].konvaRect.setX(newX + (this.boards[i].konvaRect.x() - this.x));
            this.boards[i].konvaRect.setY(newY + (this.boards[i].konvaRect.y() - this.y));

            this.boards[i].konvaText.setX(newX + (this.boards[i].konvaText.x() - this.x));
            this.boards[i].konvaText.setY(newY + (this.boards[i].konvaText.y() - this.y));
        }

        this.x = newX;
        this.y = newY;
    }

    // redrawAt(newX, newY, newW, newH) {

    //     this.boardViewRect.setX(newX);
    //     this.boardViewRect.setY(newY);
    //     this.boardViewRect.setWidth(newW  * (this.uiSettings.properties.boardViewRect.wPct / 100));
    //     this.boardViewRect.setHeight(newH * (this.uiSettings.properties.boardViewRect.hPct / 100));

    //     this.scrollLeftButtonRect.setX(newX);
    //     this.scrollLeftButtonRect.setY(newY);
    //     this.scrollLeftButtonRect.setWidth(newW  * (this.uiSettings.properties.boardViewRect.wPct / 100));
    //     this.scrollLeftButtonRect.setHeight(newH * (this.uiSettings.properties.boardViewRect.hPct / 100));
    //     this.scrollLeftButtonText.setX(newX);
    //     this.scrollLeftButtonText.setY(newY);
    //     this.scrollLeftButtonText.setWidth(newW  * (this.uiSettings.properties.boardViewRect.wPct / 100));
    //     this.scrollLeftButtonText.setHeight(newH * (this.uiSettings.properties.boardViewRect.hPct / 100));

    //     this.scrollRightButtonRect.setX(newX);
    //     this.scrollRightButtonRect.setY(newY);
    //     this.scrollRightButtonRect.setWidth(newW  * (this.uiSettings.properties.boardViewRect.wPct / 100));
    //     this.scrollRightButtonRect.setHeight(newH * (this.uiSettings.properties.boardViewRect.hPct / 100));
    //     this.scrollRightButtonText.setX(newX);
    //     this.scrollRightButtonText.setY(newY);
    //     this.scrollRightButtonText.setWidth(newW  * (this.uiSettings.properties.boardViewRect.wPct / 100));
    //     this.scrollRightButtonText.setHeight(newH * (this.uiSettings.properties.boardViewRect.hPct / 100));

    //     for (var i = 0; i < this.noOfBoards; ++i) {

    //         this.boards[i].konvaRect.setX(newX + (this.boards[i].konvaRect.x() - this.x));
    //         this.boards[i].konvaRect.setY(newY + (this.boards[i].konvaRect.y() - this.y));

    //         this.boards[i].konvaText.setX(newX + (this.boards[i].konvaText.x() - this.x));
    //         this.boards[i].konvaText.setY(newY + (this.boards[i].konvaText.y() - this.y));
    //     }

    //     this.x = newX;
    //     this.y = newY;
    //     this.w = newW;
    //     this.h = newH;
    // }

    applyTheme(uiStyles) {

        this.uiSettings.styles = uiStyles["section"];
        this.boardViewRect.fill(this.uiSettings.styles.boardViewRect.fill);
        this.boardViewRect.stroke(this.uiSettings.styles.boardViewRect.stroke);

        this.scrollLeftButtonRect.fill(this.uiSettings.styles.scrollLeftButtonRect.fill);
        this.scrollLeftButtonRect.stroke(this.uiSettings.styles.scrollLeftButtonRect.stroke);
        this.scrollLeftButtonText.fill(this.uiSettings.styles.scrollLeftButtonText.fill);
        this.scrollLeftButtonText.stroke(this.uiSettings.styles.scrollLeftButtonText.stroke);

        this.scrollRightButtonRect.fill(this.uiSettings.styles.scrollRightButtonRect.fill);
        this.scrollRightButtonRect.stroke(this.uiSettings.styles.scrollRightButtonRect.stroke);
        this.scrollRightButtonText.fill(this.uiSettings.styles.scrollRightButtonText.fill);
        this.scrollRightButtonText.stroke(this.uiSettings.styles.scrollRightButtonText.stroke);

        this.boards.forEach(function (board) {
            board.applyTheme(uiStyles);
        });

        this.layer.batchDraw();
    }

    makeScrollable(isLeftScrollable = false, isRightScrollable = false) {

        var boardView = this;

        boardView.scrollLeftButtonRect.visible(isLeftScrollable);
        boardView.scrollLeftButtonText.visible(isLeftScrollable);
        boardView.scrollRightButtonRect.visible(isRightScrollable);
        boardView.scrollRightButtonText.visible(isRightScrollable);

        boardView.layer.batchDraw();
        boardView.isLeftScrollable = isLeftScrollable;
        boardView.isRightScrollable = isRightScrollable;
    }

    makeVisible(isVisible, isLeftScrollable = false, isRightScrollable = false) {

        var boardView = this;

        boardView.boardViewRect.visible(isVisible);

        boardView.boards.forEach(function (board, index) {
            var isBoardVisible = (index < boardView.noOfNotes);
            board.makeVisible(isVisible && isBoardVisible);
        });

        boardView.makeScrollable(isLeftScrollable, isRightScrollable);

        boardView.layer.batchDraw();
        boardView.isVisible = isVisible;
        boardView.isLeftScrollable = isLeftScrollable;
        boardView.isRightScrollable = isRightScrollable;
    }

}