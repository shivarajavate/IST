
class NoteFormViewmodel {

    constructor() {

        var viewModel = this;

        viewModel.name = "";
        viewModel.model = {};
        viewModel.view = {};
        viewModel.settings = {};
        viewModel.active = false;
    }

    init(viewConfig) {

        var viewModel = this;

        viewModel.view = new NoteForm();

        viewModel.active = false;
    }
}
