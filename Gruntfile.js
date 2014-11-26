/**
 * Gruntfile [ copied from sails.js ]
 *
 * This Node script is executed when you run `grunt`.
 * It's purpose is to load the Grunt tasks in your project's `tasks`
 * folder, and allow you to add and remove tasks as you see fit.
 */

module.exports = function (grunt) {

    var includeAll = require('include-all');
    var path = require('path');

    function loadTasks(relPath) {
        return includeAll({
            dirname: path.resolve(__dirname, relPath),
            filter: /(.+)\.js$/
        }) || {};
    }

    function invokeConfigFn(tasks) {
        var taskName;
        for (taskName in tasks) {
            if (tasks.hasOwnProperty(taskName)) {
                tasks[taskName](grunt);
            }
        }
    }

    var taskConfigurations = loadTasks('./tasks/config');
    var registerDefinitions = loadTasks('./tasks/register');

    if (!registerDefinitions.default) {
        registerDefinitions.default = function (grunt) {
            grunt.registerTask('default', []);
        };
    }

    invokeConfigFn(taskConfigurations);
    invokeConfigFn(registerDefinitions);

};
