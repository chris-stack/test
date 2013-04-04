/***************************************************************************************************
**$A-Utility
**  d:none
**  n:contains manageGlobal, Type
**
*/

(function (win) {

    "use strict";

    var $A = {};

    /*manageGlobal
    **  d:none
    **
    **
    */
    (function () {
        function mix(o1, o2) {
            var kindex,
                temp;
            if (o2.constructor.name === 'Function') {
                temp = o1;
                o1 = o2;
                o2 = temp;
            }
            for (kindex in o2) {
                if (o2.hasOwnProperty(kindex)) {
                    o1[kindex] = o2[kindex];
                }
            }
            return o1;
        }
        if (win.$A && win.$A.signed) {
            win.$A = $A = mix($A, win.$A);
        } else if (win.$A) {
            $A.previous_global = win.$A;
            $A.signed = true;
            win.$A = $A;
        } else {
            $A.signed = true;
            win.$A = $A;
        }
    }());

    /*Type
    **  d:none
    **
    **
    */
    $A.Type = (function () {
        var publik = {};

        publik.get = function (obj) {
            var temp;

            // fastest, not supported by all browsers

            if (obj.constructor && obj.constructor.name) {
                return obj.constructor.name;
            }

            // 2nd fastest but fails with Null and Array (reports as object)

            temp = typeof obj;
            if (temp !== 'object') {
                // make first letter upper case
                return temp.replace(/^.{1}/, function(match) {
                    return match.toUpperCase();
                });
            }

            // slowest but most accurate

            return Object.prototype.toString.call(obj).slice(8, -1);
        };

        publik.is = function (type, obj) {
            return $A.getType(obj) === type;
        };

        publik.extend = function (o1, o2) {
            var kindex;
            for (kindex in o2) {
                if (o2.hasOwnProperty(kindex)) {
                    o1[kindex] = o2[kindex];
                }
            }
        };

        publik.as = function (collection, callNow) {
            var kindex,
                length;

            // loop through objects

            if ($A.isType('Object', collection)) {
                for (kindex in collection) {
                    if (collection.hasOwnProperty(kindex)) {
                        callNow(kindex, collection[kindex]);
                    }
                }
                return;
            }

            // loop through arrays

            if ($A.isType('Array', collection)) {
                for (kindex = 0, length = collection.length; kindex < length; kindex++) {
                    callNow(kindex, collection[kindex]);
                }
            }
        };
        return publik;
    }());

}(window));
