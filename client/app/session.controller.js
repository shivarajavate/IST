
class SessionController {
    constructor() {

        this.view;
        
        this.currentWorkspaceID = -1;
    }

    init(view) {

        this.view = view;

        this.currentWorkspaceID = this.view.boardView.workspaceID;
        this.view.headerView.setWorkspaceName(this.currentWorkspaceID); 
    }

    // Need to respond to (>)scrollRight (<)scrollLeft

    // Handler for (SCROLL-LEFT) button
    scrollLeft() {

        // It scrolls left iff any workspace is available on the left
        // NOTE: scroll left condition check
        if (this.view.boardView.workspaceID > 0) {
            --this.currentWorkspaceID;
            this.view.boardView.displayWorkspace(this.currentWorkspaceID);
            this.view.headerView.setWorkspaceName(this.currentWorkspaceID); 
        }
    }

    // Handler for (SCROLL-RIGHT) button
    scrollRight() {

        // It scrolls right iff any workspace is available on the right
        // NOTE: scroll right condition check
        if (this.view.boardView.workspaceID < this.view.boardView.noOfWorkspaces - 1) {
            ++this.currentWorkspaceID;
            this.view.boardView.displayWorkspace(this.currentWorkspaceID);
            this.view.headerView.setWorkspaceName(this.currentWorkspaceID);
        }
    }
}