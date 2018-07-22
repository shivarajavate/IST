
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

        var noteFormParams = {
            data: {
                template: viewConfig.params.data.template
            },
            callbacks: viewConfig.params.callbacks
        };

        viewModel.view = new NoteForm();
        viewModel.view.init(noteFormParams);

        viewModel.active = false;
    }
}
