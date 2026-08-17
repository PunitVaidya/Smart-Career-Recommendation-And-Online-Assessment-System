/* =========================================================
   GIRI'S TECH HUB
   MEET THE STUDENTS OF GURUJI
   TEAM SPOTLIGHT JAVASCRIPT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const yashCard =
            document.getElementById(
                "yashCard"
            );


        const punitCard =
            document.getElementById(
                "punitCard"
            );


        const teamSpotlight =
            document.getElementById(
                "teamSpotlight"
            );


        const teamClose =
            document.getElementById(
                "teamClose"
            );


        const yashProfile =
            document.getElementById(
                "yashProfile"
            );


        const punitProfile =
            document.getElementById(
                "punitProfile"
            );


        if (
            !yashCard ||
            !punitCard ||
            !teamSpotlight ||
            !teamClose ||
            !yashProfile ||
            !punitProfile
        ) {

            return;

        }


        let activeMember =
            null;


        /* =====================================================
           SHOW YASH
        ====================================================== */

        yashCard.addEventListener(
            "click",
            function () {

                showProfile(
                    "yash"
                );

            }
        );


        /* =====================================================
           SHOW PUNIT
        ====================================================== */

        punitCard.addEventListener(
            "click",
            function () {

                showProfile(
                    "punit"
                );

            }
        );


        /* =====================================================
           CLOSE PROFILE
        ====================================================== */

        teamClose.addEventListener(
            "click",
            function () {

                closeProfile();

            }
        );


        /* =====================================================
           SHOW PROFILE
        ====================================================== */

        function showProfile(
            member
        ) {

            const isSameMember =
                activeMember === member;


            /*
             * If the same member is clicked again,
             * keep the profile open.
             */

            if (isSameMember) {

                return;

            }


            activeMember =
                member;


            /* ===============================================
               REMOVE ACTIVE STATES
            =============================================== */

            yashCard.classList.remove(
                "selected"
            );


            punitCard.classList.remove(
                "selected"
            );


            yashProfile.classList.remove(
                "active",
                "profile-enter-left",
                "profile-enter-right"
            );


            punitProfile.classList.remove(
                "active",
                "profile-enter-left",
                "profile-enter-right"
            );


            /* ===============================================
               OPEN SPOTLIGHT
            =============================================== */

            teamSpotlight.classList.add(
                "active"
            );


            teamSpotlight.setAttribute(
                "aria-hidden",
                "false"
            );


            /* ===============================================
               SHOW SELECTED PROFILE
            =============================================== */

            if (
                member === "yash"
            ) {

                yashCard.classList.add(
                    "selected"
                );


                yashProfile.classList.add(
                    "active"
                );


                /*
                 * Yash profile enters from left.
                 */

                yashProfile.classList.add(
                    "profile-enter-left"
                );

            }


            else {

                punitCard.classList.add(
                    "selected"
                );


                punitProfile.classList.add(
                    "active"
                );


                /*
                 * Punit profile enters from right.
                 */

                punitProfile.classList.add(
                    "profile-enter-right"
                );

            }


            /* ===============================================
               MOVE VIEW TO PROFILE
            =============================================== */

            setTimeout(
                function () {

                    teamSpotlight.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                },
                100
            );

        }


        /* =====================================================
           CLOSE PROFILE
        ====================================================== */

        function closeProfile() {

            teamSpotlight.classList.remove(
                "active"
            );


            teamSpotlight.setAttribute(
                "aria-hidden",
                "true"
            );


            yashCard.classList.remove(
                "selected"
            );


            punitCard.classList.remove(
                "selected"
            );


            yashProfile.classList.remove(
                "active",
                "profile-enter-left"
            );


            punitProfile.classList.remove(
                "active",
                "profile-enter-right"
            );


            activeMember =
                null;


            /*
             * Return to the team selection cards.
             */

            setTimeout(
                function () {

                    const selector =
                        document.getElementById(
                            "teamSelector"
                        );


                    if (selector) {

                        selector.scrollIntoView({

                            behavior: "smooth",

                            block: "center"

                        });

                    }

                },
                100
            );

        }


        /* =====================================================
           ESC KEY
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    activeMember !== null
                ) {

                    closeProfile();

                }

            }
        );

    }
);