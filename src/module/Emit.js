
/***
 * 事件触发器
 * @returns {emit}
 * @constructor
 */
function Emit() {
    var events = {};


    function emit() {

    }

    emit.prototype = {
        on: function (eventName, eventFn) {
            events[eventName] = events[eventName] || [];
            events[eventName].push(eventFn);
        },
        trigger: function (eventName, _) {
            for (var fn in events[eventName]) {
                events[eventName][fn].apply(null, Array.prototype.slice.call(arguments, 1));
            }
        }
    }

    return new emit();
}

export default Emit