/**=========================================================
 * Module: giftboard.client.controller.js
 * giftboard for Biin in dashboard
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('dashboard')
        .controller('giftboardController', giftboardController);

    giftboardController.$inject = ['$scope', 'Organization', '$http', 'toaster', '$timeout'];

    function giftboardController($scope, Organization, $http, toaster, $timeout){
        var giftboard = this;
        var NO_IMAGE_PROFILE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAZJElEQVR4Xu1dB3hVRdp+Z27JTaVIR4qCCAI2RGRBRGmikAQEVyABXRABBUkBBPwhioCQhpRlF2HBJOBiUJKAgAWkLL0I0gSkqvSWQpKbe8/M/8y5CX8IKfeeW8652X98kJKZr817pnzzzTcElazExMTQg2fvPMQZfwzAQ4DUGNA1BGc1QXgNMFQHpX5gzMgAo1CfAgWgtACM5QL0Bgi/AUKvAdIFQuhZAn6WWvmx1s2qnIuJiWGVyWTE25UJeSuyAST8BZx0AEFbcNYaoP7u0IsBOZTgCDjfQzjdTjnd8c3y2X+4g5enaHodADq/GWOqyrJf5Bw9AflXU08ZqzQ+hLBTnJP1nPP1Wfoqmzcvi8lXUx5HeXsFAPr3jzGafbJeJoS8DsaCQWmgo4p6qH4WGEunOvKVPi/o+9TUmAIP8VXMRtMA6DM4shkDfZszDCGE11SspQoNGdhVArqMSXTx2hWxp1QQwS6WWgQACQ6L6gqOKELRwy4tNF+JbCCMxaUtT9gEgGtJXM0AQF69/5bVh4NPAaGPa8lIrpKFcxykwEdpKfHpWgGCFgBAgsOiXwH4J4TgSVcZW8t0OLAfnH2YkZK4QW05VQVA7yERLXWMJnKgm9qGUIc/2UBhjVydPOe4OvwBVQDQPTza3xfSNAY6hgI6tZTXBl9mBdHNYaaAqWsWxeR6WiaPAyB0yLjukpX9k1I09rSyWubHgTOU8eFpyxM2elJOjwGg9/AYP5KXE0fAR3pSQe/jxedm6oImeMqh5BEA9AmLfIIR8m8Azb2vQ9SQmB+hoANWJ8cdcTd3twMgNDwqnDO2CJSa3K1MpaLPeC6ndGhGcpz4cNxW3AaAzp1j9FUaZCcAGO026f8LCBNOEgzm8+NTU1Mld6jrFgAE/218IAosKwmh4rDm/4uTFmDAGjPIgO+T4+44Seq+5i4HQN+wsXWt0K3TklOHEIJHHm6Als2boHGDOmhQvw6qBgXCz88EH6MBuXn5yMnJxa3MbJz/4xLOnr+II8dP449LV11tb8X0CPgBZpVeyfjysyuKiZTS0KUA6D14QkPKrWIbo+oRbZGeTR9qgB4vPod2bVoiKDDAYbtdvHwdO/f9gu827cLV6zcdbu/qBlzCST3RdXFlDILLABA6ZFwTbpU2gZKGrlbcUXpPtmqGga+9jGZNXCMK5xx7DhzFim++w/nfLzkqjkvrM4ZzRs66fL0i8YwrCLsEAPKXL1m2qd359evWxDuD++Lxlo+4wjb30RBA2LhtL5JWrkNWdo5beNhDVIDAAN3zrhgJnAaAmPMlotuq5rAv5vjePZ5HWL+eMBoN9tjQqTq3M7Mxf0kq9h085hQdZxqL6QDc2snZNYFTALCt9qWtai74TCYfRIwYiHZPt3TGnorarl63GUkrv4UYGdQo4lQxH+QFZ3YHigEg9vlBD2ZmqLnVq14tCFOi30bjBnXVsL/Mc/f+I0hYuBzmAosqMogtoin/Qh+lfgLFAAgJj5qrppOnWtUgTJ80EvXqqB8pdujoKUxPWIICi1UVEAhnUVpKXJQS5ooAILt3gSQlDF3RJsDfD59OeQ8P1q3lCnIuobH/0HHMmLMMkuQWh12FMnKQAUrcxg4DQD7Y4XyXWr59nY4iZvxwtG6hCVfDPR2z7sftWJS0usLOcksFxnMppe0cPUByCADiSJfmZe9X81RvWFgoenXv6BYbuoLo/MVf4cete1xBSgENfiRTF9TWkaNkhwAQEha1AASjFEjmkibCwSO+fi0XsRh8f1IcLl+9oYqYhOCztKT4sfYytxsAIpKHM/advYRdXU/47efNHIcHqlVxNWmX0zt64gw+nLFQte0hYbyrvZFFdgGgf/9RAflG38NqhnG9NaA3Qnq+4PLOchfBuZ+vxKZte91Fvly6jEunTWbSOjU1Ma8iAewCQEh4RAJAIyoi5q6f16n1AOZ/Oh56vffEj964mYmR42aqtjXkwOyM5PgJFfVJhQAQodtg9JCa0btjhr+Blzo+U5Eumvv50i/XIH39FpXkYlbODa0yUmafKE+AigBAQsOjvlMzbl94+z5PmAydznu+/iKDX795G+9EzYAkqZRSgLBv05MSeykGQHBY9KuE8LUqQVhmKw54+gV3UVMEp3jHLUjBf3YfdIqGM40JpT3Svoj9viwaZY4A4q7egd+y96t50CNO+RYnfogHqmt/5V+WgYWbeOqsfzrTh861lci+9BVxz5Z1F7FMAISGRb7GCVnlHHfnWrdq0QSfTPTuawSMMbw5+iNkZbs8nM9u43LOQzJSEjJKa1AWAEhIWMRBtW/pvh3eB69262C3olqt+Pelq/D9T7tUE0/EE6YlJ4hV9H3n1qUCIDgsqhshKHPe8JQm82eN19SBj1K9d+z9BbPnqXZ2JotNOHkxLSVuc0kdSgfAoKgNaidnEMe9S+dOUWpzTbXLzMrBkPdi1JWpjB3BfQCQ07JwUu7e0ROatGvTChPff9MTrDzCY9T4Wbh4+ZpHeJXFhHP2SEZK4m/Ff34fAEIGR8eC82hVJQXwekg3DHytkmSIAfDpZ8uwa7/br/qV322Ez0pPSvigTADYsnHl/KGFhEzR74ahY7vKkzAkJXUdVq0RKYJULVdq+2Y3WLRo0d34tXtGgOCwyGBCiMhfo3oRET/Nm1aeFAIiRkDECqhf+KvpyQnriuS4BwAh4VEpAAapLySwMPYD1K1dQwuiuEQGcbFkxpylLqHlDBHC8UVaSvzdxdVdAIgMnIFS9jUKOH6HyhmJSmkrTv2SF3wEX9/Kc6P82IkzmDT97y62lOPkGGGZ1irW2uvnzTOL1ncBEDo4qifnuDs0OE7aNS3E9u9/oobi4Ub1XUNQI1Ru3c7C+5MTVL1RVGQKztE9IyX+h3sAoHaYtxBGBHzOnvo+mjSuXJ1fZPjjp85h0icLVIsU+r9vgSWmJydGlgSASGeqaqhtp/ZPIXKkJpYgbhs3NLEdBH5NT45vcRcAcsp1K7ngNq3tJDz2nQHo3KGNnbW9s9oPm3djwb9SVRdex6V636TMuSSvAUIGR/4VXE7ipGr5+IMRePwxVQcht+v/8+ET+Cj2c7fzqZABQf/0pPhVNgCofM2rSNgp0cPw9OOVO5HY7gNHMVMD20EOPicjOSGicASI2gmO5ypEjZsrDBsUjF49OrmZi7rk09b9hGX//lZdIQBIwI61yfEdiIj8+fl0Zpa7nllxRNN2T7XAxIihjjTxurrTYv+B/YfvOY9RS4es9OT4qkRO7cKYJiTSEStWLJoNHx/5LadKV/Ly8jHw7Qng1P1JLOwxnk5CYxISHt0b4KWGC9lDxJV1CvLuYPTwAejZrXJOA2vWb8LCf30Fo6/qzla52wjBKwIAYwD+mSs7UiktizkPtaoH4vP506H3wjDw8vS2WKwY+u5E3MjMhcHHV6mJXNuO4F2i9q2f4hpJ1gJY8u9g+Ft/Rd/e3V2rrMrUVn6zDktTvobBNwA6nTamABASJ0aAVQB/TWX7yOxFrh3znUz4moxYmPgx6lSS08CLl65iRMRUmC1WmPyCIMLdtVAISCoJCYvcAkI0M+lazLmQLGY81rwpYqdNkM8HvLlYJQmRE2fi5G9noTOYtDP824z6k5gCjgJUPLOqicIZgzk3S45gDn7lJYwa5t1nA5u27sLsOcLzR+DjL75+7QCaERwmIYMiLoHSOpro/UIhxGJQstge4Bz9Tjhe7dFZS+I5JEvMzLnYtfcQ9EYT9EaNLP4KNZCASyQkPCoTQJBDWrm5srwWEKMAZ6hVozq++OdszcybjqiemZWNgUMjwRiB0S9QczowhttiBMhTK+FTecbkkhXmPJGOlWP6lEi0edLziSAd6ezS6q5K24DFSavkfT/V6Z0l5/L2DMgjvQdFSJRS7UxMxdS0WgpgNd/Bc22fQMzEMS43gDsJilHsb6Mm4uqNLBhMfu5kpZg2Y4xpGgBCM7ErYNYCLJ43HfXr1VasrKcb7th9AB/PWqCtfX8JI8gA0OoUUCQr50z2DXR/qSMi33vL0/2omN+YcdNw8vQFmAK0e7VdngK0uAgsaXVxRkBgxedzp6OehrKDloWOXXsPImbmPOgNJui14vYtRdiiRaDmtoElZZUkCyx5OejUoS0mRY1Q/FV6oqHIBzAyYirO/34RPn5VQLS5vJJNYdsGDoo6AgrNL7HNd7LAuYT4GRPRsrl2w8bWbvgJ8xelgOqNMJr8PYE5xTxsjiCNuYLL0ka4h8WCsHGjB7EgbqomXcRi3z/0vUnyA1RG30BNbv1K2Fe4grVzGFQRlItGgSED+mBA/3KTX1VEyi0/nx67ENt27gPVGTRz5l+eorbDIJWTQDrSE0XHxSJWYM6syWj6cCNHmru17qYtOzH7s8U2n7/w+lEvSGvHEUtCB0eN5hzi8QevKMI7yCUL6tetjXmx/wM/P/X9639evIL3xn0MEfKlwRO/svtVBIT0GRzZi3Gyxit6HwBjEgpys2UXcftnn8KUCe+q6mMXnT72g+nyqh+ghSd+2jjvr6hP5ZCw1wZGPGzV0dMVVdbSz60FebAW2E4L+4X0wLAhr6sinsgAKvb7ew/8IvM3mAKg02sk2scOizCibySHhe8/nZ2phWvhdsh8t4o5Nxuc2d7oGRreD/37ePaZYuHrj527BGLuF4XqfWDUqM+/NLuKa+JrkhKraepiiCMAEIEj+XnZINyWh3fY4P7oF/qyIyQU1xXOnoT5S/Hj5h0yDUJ0mjzuLVdBzrenpyR0LLwaFvkZQLzruE14sgo9hEWKjhkxGK90d++bAvn5ZnyauAjC3SsKJxQm3wDvWPXfgwjbFXEZAKFh0a9zwlcq/iRUbGi1mGE158oSRIx6Ez26Pu9WaTb8uBVz/v5FIQ8Cg6+/dqJ8HdCccN4vLSXhaxkAfQeNf1Ci0u8OtNdUVas5D1ZLPv61YKbbD4su/HEJw8d8KOtv8PGHzuCdt5gsOlp33bLYy8VSxESc5Jy659VlD8Clfq1qWBA32QOcgKHvTcbVG9le2/mMkeNrlsfJgcB3ARAS7p3rgKIeHzooRH5A2hPlm7UbkfTVek+wcguP4i+N3gVAcFjEy4RQr9QqKNAfi+InQTwk7YmSm5uP4VHTkXOnwjeZPCGO4zwI6ZaeFPfjPSOASBNXRcq+orUIYXu0GzGkL17u8hd7qrqszprvtmHJck3k1HRIJxEEYioIrJ2aGlNwDwDEX0IGRSSB0nCHKKpcWTwqMe2DER53BwtfwOQZC3H85FmVLeAge4Kl6UnxfytqdY/T2tvOBWpUr4q4j95H1SqBDlrBNdVv3spCdMwciN+9pXDOemakJG4oFQAiWXS+KfN3CqqdZ7nLsGy1KoGYNmmk6g9KXPjzsvxKqJpPwtgNPsYu1/a/07DMZNGCUHB41CwCjLebqAoV69WpKWcT1Uou4T8vXcO0+MWqvRdsbxcQ8JlpyQmTite/79yy18Bxj+h07KS9RD1dr0O7JzDqrX7w10AcQHHdxY5g3uKV2K32mwDldAihtGnaF7H3nPyWenAdEh69HuCeOVmxE0Hi6TjxdHz7Z1rb2UKdatt2HcTSLzM0ty7gwNqM5PjeJa1SKgBCB0V24ZTI+0S1i0geHdrzBfTs2gFGg/bu15VmH/GE/Lof/oP0DVtxO1MEr6hfKFjn1cmJ971jW+azccFhUQfUejRSZNAQGUO7dHoW7du2hkHvHR1fspstVit27DmEjVv34vDx0+oliS7n8chyHo6MCuUEqz2FXfFGQKvmTfBcm1Zo90xriFV+ZSoiXfzOfYflNcKRX89AkiSPqcc56ZWREldqdsrygtdIcHjUXgK4LXtzYIAf2jzRAm2fegxPtX4UfpXogYjyele4kkXO4D0/H8P+Q8eRc8d2nO2ewnanJye2d/jpWCGMO84H6tWpgXZtWqPd0y3xaNNGHvfgucfIyqkKj+KJ385D5BDete+wy7eShPGuacsTNpYlYYXhq67YEVQJCsBLHZ/BC395Go0b1lNurf+ClmfO/4kt2w/gp+37nHcuEWSkJ8WHlGe2CgHQJ3xsCyt0hymg6KaDcNYkfhIJUyVN/+ouTOblmzF2cjyuXLupiIXEYAGnLdeuiBUPgZRZKgSAaOnsY5LCeRM1chA0mohEkYHd2UiEm8ctSJYXjYoLwYz0pPgKI2TsAkDv4TF+JC/7MAEeViqQeApWgMBo9J64eaW6OtNO+BBi5ydj38FjiskQwk7dplUe37wsxnZ5wtkRQLR3zjnEIfL9NHvoQUz9YBSqBFWuLV5FRrb357duZ2LqzAU4c+ES9HqjnM1ZSSnrpfDSaDnEQWnYWF7ObZDCp+trPFANk6NHosWjTZToVmnbHDl2EjPi/4Gbt0TWvsJwczm1nGP5u4qHe9ljLIcAYIsaytoLkFb2EC+qY7vVK/a6XP4ncbt3yMA+8kUOreTNdUQfV9YV20CRSDplZTrE3G8rBAaTv8PXzDhwyFK1oF3Ro5D2yOkQAATBPuHRrRhju0GJQ7nPJKtFzgReBAJBS4wC0aOHelX2L3uMam+d3/+8hLi5S3DiVPGoImV3DRiQo4f07OrkOcft5W+DmoISGhY1gBOscLSpLfmjAEER0gGDQY9+IS/jjdderbQvhZS0k7hd9OXXa/F1+vewWm33G20fvk6+X6goqWThK2CO9okiAAgmShNLiEuVBfnijn8xxQE5JWz4gD7o2rl9pZ0WxHAv7hMmfZmG6zdu3dNXRGQVMfkr0p0DszOS4yc42vmKRwDRsH///rp8U8PVFLjvjNkeQYpu85Ss26hBPYT9NQQd27dRZAx7eHu6juj4/+zcL8/z4mbRvYVAb/RRnkia89VG8+/9U1NTFZ0uKR4BbCAYFWAxmbZwkKeVGFWMAgX5uXL2r5JFZAARi8QuLzwHo9E7r1+ZzQXYuGUnVqVvgHg0omQRaWQMPgqHfNtEuge+gS+uWRSj+DTJKQAIhYIHvF8bRL+V6NBMCQhEG5HswZbwwbZLKF4CAvzQ/cWO6Nm9ExrUr6uUhUfbicXduu+24Ieftpd60sfFKl9OH29SLJe43mUyml9IXTrvmmIiSheBJRmKy6UWSNsoRWOlwoiUsJaCfDCL/Kx9qaVZk8bo0rm9PD08UL2aUlZuaXfj5i1s27FfThhx8vS5MngQUIMRBqOvk9MbOysRPL82KfFPZ5VxegQoEkCkmikgdKMzIBC0OJPk0UD4DsoqwnfQrGljPNf2STmN/CNNGjtpUMfNKBazp86cx/6fj2DnnoM4dfpcORE/RN7Tiy/e+exh7CzR8ZfSls0pC2UOKeMyAAiu4hVybiY/OjMdFEkvMoCIK9+SRQDh/qmh5DTR+rFHZb9Ci2YPy+njfF0cXCK2br+dOY9fT57BsROn8cvRX+WEkOUXIt8gFjmDXZQy9leJsK6u+PKL5HYpAARReU2g13/rqkgi8aWJ0UBkChWjgz1FjBC1aj6Axg3ro26dmqhTq6b8d3GDSJxD+Pv7wscohmIDKCEoKLBAxO/l5NxBZlaOHMh55dp1XLl6HRcvXcH5Cxdx+ep1u2P6xFeuM/hApze6bGQSCz6TvqCXs3N+Sfu5HACCgdgd5Jt8VyjdIpbVyUyyymlhJIsFKGXnYA843FaHiE43yNlCFDlyyhOM89XMLyjMmdV+mdOpuwwi/AQWn0azOeGR7uAhwMAEGKzWu9nC3MGnPJqE6qHT6+XUsC7v9ELGwsnjk39hktJ9fkU2ccsIUJxpcHj0G0RiS6Bz7OygIsGL/1xME4xZwa1WSEySk0kWZQ9zhE65HyGI3Mk6qgPRiU7Xu2x4L42vJHz7nL8p8vi4SofS6LgdAIKpfIAE9qWjp4jOKC62lQIIYjEp/lz0OxiX53JOAMJti0vxf7FuEP+B2n4X87hYuIlflNj+7KkiTvW4Dm+sWRb/q7t5egQAtnVBhG+BiXzqjeno3N0J94xmQLylasFkR450nZHPYwAoElJEFjFKFjkTXuaMwlptK8K4wHTD01LiNntSRo8DQChXGGM4lYBFiiSrnlRYa7xE9K5Oh1hjHvskNTXR40mHVAFAUScEh41/lIMlUMJf0VrHeEQeggzJSqMrCt12pyyqAuDutDBkXHdu4dOh48+4U1nt0Ga7CSOTy7ux4ylZNQGAQmVJcFhkb0owVenxsqeMppiPRPZxipiMlLh1Ffq3FTNxrKGWAFAkOQkeHNmZMxpdWaYGkZxBBxa3Ojlxq1Y6/q6xHcOLZ2sHh0U0JZQMAydvAvCed2OFmRi7TChZCqpbUjIti2etWD43LY4A90k8fPhww5W8gG6Ek9clykIpp5p8j1UkYaQ6rOaMfVXH787G4tm4tNTpxWXxCgAUF7jn6NE+hlvGToSwngAVz4Q0V9O4IjJHR7CeU6w35gVsLcrAqaZMjvD2OgCUVK5v2Ni6EtV14Jx3YCDP6hhrDUrddfdMPF96GITvIZxsL9DrtouU644YXGt1vR4ApRiU9B0Y1ZDp8RgHHgLIQ4SjEQevwQhqcI4ahMFXPPAFxmzZpSk1g8HMKfIIwXXKcZ2AXOecnwPFOQKclaA/uiZplnhTofzoFK31cAXy/C9/dhxeaBFNkgAAAABJRU5ErkJggg==";
        $scope.isLoading = true;
        $scope.itemDragged = false;

        init();

        function init(){
            $scope.organizationService = Organization;
            getGiftBoardData();
        }

        /**=============================================================================================================
         * Events Listeners
         *
         =============================================================================================================*/

        $scope.$on('organizationChanged', function () {
            $timeout.cancel($scope.giftBoardTimeout);
            getGiftBoardData();
        });

        $scope.$on('Biin: Site Changed', function (scope, site) {
            $timeout.cancel($scope.giftBoardTimeout);
            getGiftBoardData();
        });

        $scope.$on('Biin: Days Range Changed', function (scope, numberdays) {
            $timeout.cancel($scope.giftBoardTimeout);
            getGiftBoardData();
        });

        $scope.$on('$locationChangeStart', function(){
            $timeout.cancel($scope.giftBoardTimeout);
        });

        //Get the information need it for the giftboard
        function getGiftBoardData(){
            $scope.organizationId = $scope.organizationService.selectedOrganization.identifier;
            $scope.isLoading = true;

            //Get products to update gifts images
            $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/readyElements/')
                .success(function (data) {
                    $scope.products = data.data.elements;
                });

            getGiftsData();
        }
        //Get the gifts information
        function getGiftsData() {
            if($scope.organizationId){
                //Getting the information
                $http.get(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/dashboard')
                    .success(function (data) {
                        if($scope.itemDragged==false){
                            generateDisplayInfo(data);
                        }
                    });
            }
        }
        //Function to parse the information to what we need to display
        function generateDisplayInfo(data) {
            $scope.items = [
                {'name': 'Enviados','status':'SENT','gifts':[],'allowedTypes':[]},
                {'name': 'Reclamados','status':'CLAIMED','gifts':[],'allowedTypes':['SENT']},
                {'name': 'Entregados','status':'DELIVERED','gifts':[],'allowedTypes':['CLAIMED']}
            ];

            if (Array.isArray(data)) {
                for(var i in data){
                    var currentStatus = data[i].status;
                    var list = _.find($scope.items, function(o) {return o.status === currentStatus;});
                    //If status is REFUSED nothing happens
                    if(list){
                        //Setting the image URL
                        var imageURL = "";

                        if( data[i].user && data[i].user.facebookAvatarUrl && data[i].user.facebookAvatarUrl != ""){
                            imageURL = data[i].user.facebookAvatarUrl;
                        } else if(data[i].user &&  data[i].user.url && data[i].user.url != "" ){
                            imageURL = data[i].user.url;
                        } else {
                            // if(data[i].user.gender==='male'){
                                imageURL = 'modules/core/img/icons/maleAvatar.png';
                            // } else{
                                // imageURL = NO_IMAGE_PROFILE;
                            // }

                        }
                        data[i].image = imageURL;
                        //Pushing the object
                        list.gifts.push(data[i]);
                    }
                }
            }
            refreshingData();
        }
        //Function to refresh data every 2 second
        function refreshingData() {
            $scope.giftBoardTimeout = $timeout(function(){
                getGiftsData();
                $scope.isLoading = false;
            },1500)
        }
        //Function triggered when a gift was dropped
        $scope.itemInserted = function(event, type) {
            var target = event.path[1].getAttribute('data-status');
            $scope.itemDragged = false;

            if(type === 'SENT' && target == 'CLAIMED') {
                $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/dashboard/gift/' + $scope.dragGift + '/claim')
                    .success(function (data) {
                        getGiftsData();
                        toaster.pop('success', '', 'El regalo se ha enviado exitosamente');
                    });
            } else if(type === 'CLAIMED' && target === 'DELIVERED') {
                $http.post(ApplicationConfiguration.applicationBackendURL + 'api/organizations/' + $scope.organizationId + '/dashboard/gift/' + $scope.dragGift + '/deliver')
                    .success(function (data) {
                        getGiftsData();
                        toaster.pop('success', '', 'El regalo ha sido entregado exitosamente');
                    });
            }
        };
        //Function triggered when a gift start dragging
        $scope.dragStart = function(gift) {
            $scope.itemDragged = true;
            $timeout.cancel($scope.giftBoardTimeout);
            $scope.dragGift = gift.identifier;
        }
        //Function triggered when a gift stop dragging
        $scope.dragCanceled = function() {
            refreshingData();
            $scope.itemDragged = false;
        }
        //Function to set the image of the current product into the thumbnail in the Objects Sidebar
        $scope.setProductName = function (product) {
            for(var i in $scope.products){
                if(product == $scope.products[i].elementIdentifier){
                    return $scope.products[i].title;
                }
            }
        };
    }
})();
