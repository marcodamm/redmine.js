/*!
 * Redmine.js
 * @license GPLv2
 */
(function(){
    'use strict';

    angular
        .module('rmProjects')
        .factory('memberships', [
            '$log',
            '$q',
            '$localStorage',
            'userService',
            MembershipsService]);

    function MembershipsService( $log, $q, $localStorage, userService ) {
        var memberships = $localStorage.memberships || [];

        function saveLocal() {
            $localStorage.memberships = memberships;
        }

        function getMemberships() {
            var q = userService.get({
                'user_id': 'current',
                'include': 'memberships'
            }).$promise.then(function(data) {
                $log.debug(data);
                memberships.length = 0;
                angular.extend(memberships, data.user.memberships);
                saveLocal();
            }).catch(function(e) {
                $log.error("failed to get memberships");
                $q.reject();
            });

            return q;
        }

        return {
            get: function(){ getMemberships(); return memberships; }
        };
    }

})();