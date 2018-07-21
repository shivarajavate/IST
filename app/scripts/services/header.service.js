
var ist = angular.module('ist');
ist.service('HeaderService', [
    '$timeout',
    '$interval',
    function ($timeout, $interval) {

        var timer = {
            sessionTime: "0:00"
        };

        function countdown(minutes) {
            var seconds = 60;
            var mins = minutes;
            function tick() {
                var currMinutes = mins - 1;
                seconds--;
                if (seconds > 0) {
                    timer.sessionTime = currMinutes + ":" + seconds;
                    $timeout(tick, 1000);
                } else {
                    if (mins > 1) {
                        $timeout(function () { countdown(mins - 1); }, 1000);
                    }
                }
            }
            tick();
        }

        function startTimer() {
            var sessionTimer = document.getElementById("sessionTimer");
            sessionTimer.classList.remove("disabled");
            function hourGlass() {
                sessionTimer.classList.add("fa-hourglass-start");
                sessionTimer.classList.remove("fa-hourglass-half", "fa-hourglass-end");
                $timeout(function () {
                    sessionTimer.classList.remove("fa-hourglass-start", "fa-hourglass-end");
                    sessionTimer.classList.add("fa-hourglass-half");
                }, 1000);
                $timeout(function () {
                    sessionTimer.classList.remove("fa-hourglass-start", "fa-hourglass-half");
                    sessionTimer.classList.add("fa-hourglass-end");
                }, 2000);
            }
            hourGlass();
            $interval(hourGlass, 3000);
        }

        function startCountDown(minutes) {
            countdown(minutes);
        }

        function wireUpEventHandlers() {
            $(function () {

                $('#hamburgerMenu').on('hidden.bs.modal', function () {
                    $('#hamburger>input[type="checkbox"]').prop('checked', false).change();
                });

                $(".jottings-dropup-header").click(function () {
                    $(".jottings-dropup .footer-menu").slideDown("slow", function () {
                        $(".jottings-dropup .footer-menu").find('textarea').each(function () {
                            var event = document.createEvent('Event');
                            event.initEvent('autosize:update', true, false);
                            this.dispatchEvent(event);
                        });
                    });
                });

                $(".jottings-dropdown-header").click(function () {
                    $(".jottings-dropup .footer-menu").slideUp("slow");
                });

                $(".notes-dropup-header").click(function () {
                    $(".notes-dropup .footer-menu").slideDown("slow", function () {
                        $(".notes-dropup .footer-menu").find('textarea').each(function () {
                            var event = document.createEvent('Event');
                            event.initEvent('autosize:update', true, false);
                            this.dispatchEvent(event);
                        });
                    });
                });

                $(".notes-dropdown-header").click(function () {
                    $(".notes-dropup .footer-menu").slideUp("slow");
                });

                $(".questions-dropup-header").click(function () {
                    $(".questions-dropup .footer-menu").slideDown("slow", function () {
                        $(".questions-dropup .footer-menu").find('textarea').each(function () {
                            var event = document.createEvent('Event');
                            event.initEvent('autosize:update', true, false);
                            this.dispatchEvent(event);
                        });
                    });
                });

                $(".questions-dropdown-header").click(function () {
                    $(".questions-dropup .footer-menu").slideUp("slow");
                });

            });
        }

        return {
            timer: timer,
            startTimer: startTimer,
            startCountDown: startCountDown,
            wireUpEventHandlers: wireUpEventHandlers
        }
    }
]);
