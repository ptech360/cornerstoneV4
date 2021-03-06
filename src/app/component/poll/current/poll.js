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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var poll_service_1 = require("../../../providers/poll.service");
var router_1 = require("@angular/router");
var loaderstop_service_1 = require("../../../providers/loaderstop.service");
var CurrentPollComponent = /** @class */ (function () {
    function CurrentPollComponent(ps, ls, router) {
        this.ps = ps;
        this.ls = ls;
        this.router = router;
        this.polls = [];
        this.currentPage = 1;
        this.noMore = true;
        this.loader = false;
        this.emptyPolls = true;
        this.ls.setLoader(false);
    }
    CurrentPollComponent.prototype.ngOnInit = function () {
        this.getPolls();
    };
    CurrentPollComponent.prototype.ngOnDestroy = function () {
        this.ls.setLoader(true);
    };
    CurrentPollComponent.prototype.getPolls = function () {
        var _this = this;
        this.loader = true;
        this.ps.getPolls(this.currentPage).subscribe(function (res) {
            if (res.status == 204) {
                _this.polls = [];
                _this.loader = false;
                _this.emptyPolls = true;
                return;
            }
            _this.loader = false;
            _this.emptyPolls = false;
            if (_this.currentPage == 1)
                _this.polls = res;
            else
                _this.polls = _this.polls.concat(res);
            if (res.length < 6)
                _this.noMore = true;
            else
                _this.noMore = false;
        }, function (err) {
            _this.loader = false;
            _this.router.navigate(['/error']);
        });
    };
    // public changeDate(obj: any) {
    //   var day, mon, yr, date;
    //   day = (obj.expiredAt).slice(8, 10);
    //   mon = (obj.expiredAt + 1).slice(5, 7);
    //   yr = (obj.expiredAt + 1).slice(0, 4);
    //   date = day + '/' + mon + '/' + yr;
    //   return date;
    // }
    CurrentPollComponent.prototype.previousPoll = function () {
        delete this.polls;
        this.currentPage -= 1;
        this.getPolls();
    };
    CurrentPollComponent.prototype.nextPoll = function () {
        delete this.polls;
        this.currentPage += 1;
        this.getPolls();
    };
    CurrentPollComponent = __decorate([
        core_1.Component({
            selector: 'current-poll',
            templateUrl: './poll.html',
            styleUrls: ['./poll.css'],
        }),
        __metadata("design:paramtypes", [poll_service_1.PollService, loaderstop_service_1.LoaderStop, router_1.Router])
    ], CurrentPollComponent);
    return CurrentPollComponent;
}());
exports.CurrentPollComponent = CurrentPollComponent;
//# sourceMappingURL=poll.js.map