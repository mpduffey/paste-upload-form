"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var grid_1 = require('modules/grid/grid');
var PasteUploadForm = (function () {
    function PasteUploadForm() {
        var _this = this;
        this.gridRows = [];
        this.gridColumns = [];
        this.options = [
            { value: "Contact", label: "Contact" },
            { value: "County", label: "County" }
        ];
        this.processValue = function (val, hdrs) {
            var headers = [], parsedValue = [], pArray = val.split('\n');
            _this.gridColumns = [];
            headers = hdrs ? hdrs.split(',') : pArray[0].split('\t');
            pArray.forEach(function (x, i) {
                var recArray = x.split('\t');
                if (!hdrs & i != 0 || hdrs) {
                    var obj_1 = {};
                    headers.forEach(function (h, j) {
                        obj_1[headers[j]] = recArray[j];
                    });
                    parsedValue.push(obj_1);
                }
            });
            _this.parsedValue = parsedValue;
            headers.forEach(function (x) {
                _this.gridColumns.push(new grid_1.Column(x, x));
            });
            _this.gridRows = parsedValue;
        };
    }
    PasteUploadForm = __decorate([
        core_1.Component({
            selector: 'paste-upload-form',
            template: "\n\t\t<input class=\"form-control max-width\" #headers>\n\t\t<textarea class=\"black-text max-width\" #pasteValue rows=15></textarea>\n\t\t<div>\n\t\t\t<button class=\"btn btn-primary\" (click)=\"processValue(pasteValue.value, headers.value)\">Process</button>\n\t\t\t<button class=\"btn btn-danger\" (click)=\"headers.value=null;pasteValue.value=null;\">Clear</button>\n\t\t\t<button class=\"btn btn-primary\" (click)=\"showJSON=!showJSON\"><span *ngIf=\"showJSON\">Hide</span><span *ngIf=\"!showJSON\">Show</span> JSON</button>\n\t\t\tType: <select class=\"black-text\"><option *ngFor=\"let option of options\" [value]=\"option.value\">{{option.label}}</option></select>\n\t\t</div>\n\t\t<p *ngIf=\"showJSON\">{{parsedValue | json}}</p>\n\t\t<grid [rows]=\"gridRows\" [columns]=\"gridColumns\"></grid>\n\t",
            directives: [grid_1.Grid]
        }), 
        __metadata('design:paramtypes', [])
    ], PasteUploadForm);
    return PasteUploadForm;
}());
exports.PasteUploadForm = PasteUploadForm;
//# sourceMappingURL=paste-upload-form.js.map