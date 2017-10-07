import {isNumber} from "util";
export class Utils {

    static walk(obj, callback) {
        for (var property in obj) {
            if (obj[property] == null){
                obj[property] = callback.call(null, obj[property]);
            }else if (obj.hasOwnProperty(property)) {
                if (obj[property].constructor == Object) {
                    this.walk(obj[property], callback);
                } else if (obj[property].constructor == Array) {
                    for (var i = 0; i < obj[property].length; i++) {
                        this.walk(obj[property][i], callback);
                    }
                } else {
                    obj[property] = callback.call(null, obj[property]);
                }
            }
        }
        return obj;
    }

    static prepareNullValues(obj){
       return this.walk(obj, function(value) {
           return value == null ? "" : value;
       });
    }

}