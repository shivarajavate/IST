
class SessionBoardView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.workspaceCollection = [];
        // NOTE: There are only 2 workspaces for each session
        this.noOfWorkspaces = 2;
        this.wsNames = ["RECON", "SEARCH"];

        this.workspaceID = -1;

        this.isVisible = false;
    }

    init(layer, x, y, wsName, templateJSON, valueJSON) {
        // Create all the workspaces(store in workspaceCollection object) and hide them
        // Set the workspaceID based on the wsName
        // Display the workspace based on the wsName specified
        this.layer = layer;
        this.x = x;
        this.y = y;

        // Create all the workspaces and hide them
        for (var i = 0; i < this.noOfWorkspaces; ++i) {
            this.workspaceCollection[i] = new Workspace();
            this.workspaceCollection[i].init(layer, x, y, this.wsNames[i], templateJSON, valueJSON);
            this.workspaceCollection[i].makeVisible(false);
        }

        // Set the workspaceID based on the wsName
        // Display the workspace based on the wsName specified
        this.workspaceID = this.wsNames.findIndex(name => name === wsName);
        this.workspaceCollection[this.workspaceID].makeVisible(true);

    }

    displayWorkspace(newWorkspaceID) {
        // Basically we are overwriting the existing workspace
        // Hide the current workspace
        this.workspaceCollection[this.workspaceID].makeVisible(false);
        // Show the new workpace
        this.workspaceCollection[newWorkspaceID].makeVisible(true);
        this.workspaceID = newWorkspaceID;
    }


    makeVisible(isVisible) {
        // Make all the workspaces not-visible
        for (var i = 0; i < this.noOfSections; ++i) {
            this.workspaceCollection[i].makeVisible(false);
        }
        // Make the associated 'workspace' visible/not-visible
        this.workspaceCollection[this.workspaceID].makeVisible(isVisible);
        this.isVisible = isVisible;
    }


}