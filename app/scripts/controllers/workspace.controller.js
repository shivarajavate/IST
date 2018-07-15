
var ist = angular.module('ist');
ist.controller('WorkspaceController', [
  '$scope',
  '$filter',
  '$state',
  '$cookies',
  '$timeout',
  '$interval',
  'AppService',
  'HeaderService',
  'ProjectService',
  function ($scope,
    $filter,
    $state,
    $cookies,
    $timeout,
    $interval,
    AppService,
    HeaderService,
    ProjectService) {

    // NOTE: Model values used
    $scope.projects;
    $scope.templates;
    $scope.templateNames;
    $scope.currProject;
    $scope.currSession;
    $scope.currDuration;
    $scope.selectedProject;
    $scope.selectedSession;
    $scope.userName;
    $scope.project;
    $scope.timer;
    $scope.projectMenuError;
    $scope.menu;
    $scope.disableLinks;
    $scope.newProject;

    function resetMenu() {
      $scope.menu = {
        show: false,
        project: {
          show: false,
          new: {
            show: false
          },
          list: {
            show: false
          },
          clone: {
            show: false
          },
          modify: {
            show: false
          },
          delete: {
            show: false
          }
        },
        session: {
          show: false
        },
        theme: {
          show: false
        },
        logout: {
          show: false
        }
      }
    }

    function load() {
      AppService.loadResources();
      $scope.newProject = {};
      resetMenu();
      HeaderService.wireUpEventHandlers();
      $scope.userName = $cookies.getObject('UserName');

      $scope.loadProjectMenu();

      $interval(saveProjectWorkspace, 5000);
    }

    $scope.resetProjectMenuHeader = function () {
      if ($scope.selectedProject) {
        $scope.selectedProject = $scope.projects[0] || {};
      }
    }

    function resetProjectMenuError() {
      $scope.projectMenuError = {
        status: false,
        message: '',
        confirm: false
      }
      $scope.deletebutton = true;
    }

    function setProjectMenuError(status, message, confirm) {
      $scope.projectMenuError = {
        status: status,
        message: message,
        confirm: confirm
      }
      if (!confirm) {
        $timeout(resetProjectMenuError, 3000);
      }
      else if (status && confirm) {
        $timeout(modalHideOnSuccess, 1000);
      }
    }

    function modalHideOnSuccess() {
      $('#hamburgerMenu').modal('hide');
    }

    $scope.resetProjectMenu = function () {
      $scope.resetProjectMenuHeader();
      resetProjectMenuError();
    }

    $scope.loadProjectMenu = function () {

      $scope.resetProjectMenu();

      $scope.projects = [];
      $scope.templates = [];
      $scope.templateNames = [];

      ProjectService.loadProjects().then(function (projects) {

        $scope.projects = $filter('orderBy')(projects, 'name');
        $scope.currProject = $scope.projects[0] || {};
        $scope.selectedProject = $scope.projects[0] || {};
        $scope.newProject = $scope.projects[0] || {};
      }).then(function () {

        ProjectService.loadTemplates().then(function (templates) {

          $scope.templates = templates;
          $scope.templateNames = templates.map(template => template.name);
        });
      }).then(function () {

        $scope.currSession = "RECON";
        $scope.currDuration = "45";
        $scope.disableLinks = $scope.projects.length ? true : false;
      });
    }

    $scope.showMenu = function (level1, level2, level3) {
      $scope.resetProjectMenu();
      resetMenu();
      if (level1) {
        $scope.menu.show = true;
      }
      if (level2) {
        $scope.menu[level2].show = true;
      }
      if (level3) {
        $scope.menu[level2][level3].show = true;
      }
    }

    $scope.openMenu = function (type) {
      switch (type) {
        case 'project':
          $scope.loadProjectMenu();
          $scope.showMenu('menu', 'project');
          break;
        case 'new':
          if ($scope.selectedProject) {
            $scope.selectedProject = $scope.projects[0] || {};
          }
          $scope.newProject = Object.assign({}, {
            name: '',
            description: '',
            details: undefined,
            templateName: undefined,
            createdBy: $scope.userName,
            lastModifiedBy: $scope.userName
          });
          $scope.showMenu('menu', 'project', 'new');
          break;
        case 'clone':
          if ($scope.selectedProject) {
            $scope.selectedProject = $scope.projects[0] || {};
          }
          $scope.newProject = Object.assign({}, $scope.selectedProject);
          $scope.newProject.name += "(Copy)";
          $scope.showMenu('menu', 'project', 'clone');
          break;
        case 'modify':
          if ($scope.selectedProject) {
            $scope.selectedProject = $scope.projects[0] || {};
          }
          $scope.newProject = Object.assign({}, $scope.selectedProject);
          $scope.showMenu('menu', 'project', 'modify');
          break;
        case 'delete':
          $scope.showMenu('menu', 'project', 'delete');
          break;
        case 'theme':
          $scope.showMenu('menu', 'theme');
          break;
      }
    }

    $scope.addProject = function (type, newProject) {
      var newProject = $scope.newProject;
      var isFilled = (newProject.name && newProject.templateName);
      var isValid = !($scope.projects.find((project) => project.name === newProject.name));

      var isModifyValid = false;
      if (type === 'modify') {
        isModifyValid = (newProject.name === $scope.selectedProject.name);
      }
      if (isFilled) {
        if (isValid || isModifyValid) {
          switch (type) {
            case 'add':
              ProjectService.addProject(newProject).then(function () {
                var confirmationMessage = AppService.getResourceText("R005");
                setProjectMenuError(true, confirmationMessage, true);
              });
              break;
            case 'clone':
              ProjectService.addProject(newProject).then(function () {
                var confirmationMessage = AppService.getResourceText("R006");
                setProjectMenuError(true, confirmationMessage, true);
              });
              break;
            case 'modify':
              ProjectService.updateProject(newProject).then(function () {
                var confirmationMessage = AppService.getResourceText("R007");
                setProjectMenuError(true, confirmationMessage, true);
              });
              break;
          }
        }
        else {
          var errorMessage = AppService.getResourceText("R002");
          setProjectMenuError(true, errorMessage, false);
        }
      }
      else {
        var errorMessage = AppService.getResourceText("R001");
        setProjectMenuError(true, errorMessage, false);
      }
    }

    $scope.setNewProject = function (type, selectedProject) {
      switch (type) {
        case 'clone':
          $scope.newProject = Object.assign({}, $scope.selectedProject);
          $scope.newProject.name += "(Copy)";
          break;
        case 'modify':
          $scope.newProject = Object.assign({}, $scope.selectedProject);
          break;
      }
    }

    $scope.delete = function () {
      setProjectMenuError(false, '', true);
      $scope.deletebutton = false;
    }

    $scope.deleteProject = function (project) {
      ProjectService.deleteProject(project).then(function () {
        var confirmationMessage = AppService.getResourceText("R008");
        setProjectMenuError(true, confirmationMessage, true);
      });
    }

    $scope.loadWorkspace = function (currProject, currSession) {

      ProjectService.loadProject(currProject).then(function (params) {

        $scope.selectedSession = currSession;

        $scope.project = new Project(params);

        $scope.project.startSession();
        HeaderService.startTimer();
        HeaderService.startCountDown($scope.currDuration);
        $scope.timer = HeaderService.timer;
      });
    }

    function saveProjectWorkspace() {
      if ($scope.project && $scope.project.open) {
        ProjectService.saveProject($scope.project.model);
      }
    }

    $scope.applyTheme = function (name) {
      var view = document.getElementById('ist');
      if (view) {
        view.className = name;
      }
      if ($scope.project) {
        $scope.project.views.applyTheme();
      }
    }

    $scope.logout = function () {
      var userName = $cookies.remove('UserName');
      saveProjectWorkspace();
      // remove modal-backdrop manually on location path change
      $('.modal-backdrop').remove();
      $state.go(appConst.states.login);
    }

    load();
  }
]);
