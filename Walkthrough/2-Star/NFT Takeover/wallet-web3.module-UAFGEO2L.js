import { d as v } from "./chunk-M6LNWEW6.js";
import { a as re, b as m, c as oe, d as se, e as ce, f as le, g as me } from "./chunk-BDIM6GZO.js";
import { a as ae } from "./chunk-VS3A3LTT.js";
import { A as G, B as ee, I as te, J as ne, P as ie, Q as E, o as U, z as Y } from "./chunk-DYXK4NW4.js";
import { a as F } from "./chunk-QBYXNN7Z.js";
import { I as b, J as $, e as R, j as z, k as K, m as J, q as Q, v as X, x as Z } from "./chunk-NWDAIMF4.js";
import { Ab as g, Cb as I, Ga as c, Qb as o, Rb as f, Sa as B, Sb as w, Ta as T, Tb as O, Vb as L, Wb as P, Xb as N, Z as A, Zc as H, ba as u, ce as j, ee as _, hb as x, hc as d, ic as p, jb as W, ne as V, ob as k, oe as C, pb as a, pe as q, qb as r, ve as M, yc as D } from "./chunk-QDZ6R7S6.js";
import { i as h } from "./chunk-NUMHA4AJ.js";
function he(i, de) {
    if (i & 1 && (a(0, "span"),
        o(1),
        r()),
        i & 2) {
        let e = I();
        c(),
            O("", e.userData.address.substring(0, 6), "...", e.userData.address.slice(-6), " ")
    }
}
function fe(i, de) {
    i & 1 && (a(0, "span"),
        o(1),
        d(2, "translate"),
        r()),
        i & 2 && (c(),
            f(p(2, 1, "BTN_CONNECT_METAMASK")))
}
var { ethereum: ge } = window
    , S = "0x413744D59d31AFDC2889aeE602636177805Bd7b0"
    , Fe = se({
        autoConnect: !0,
        provider: re()
    })
    , y = (() => {
        class i {
            keysService = u(ae);
            snackBarHelperService = u(G);
            changeDetectorRef = u(D);
            userData;
            session = !1;
            walletBalance = "0";
            myBEEBalance = 0;
            inputAmount = null;
            successResponse = !1;
            mintButtonDisabled = !0;
            challengeSolved = !1;
            errorMessage = "";
            metamaskAddress = "";
            ngOnInit() {
                this.handleAuth(),
                    window.ethereum.on("chainChanged", this.handleChainChanged.bind(this))
            }
            handleChainChanged() {
                return h(this, null, function* () {
                    yield this.handleAuth()
                })
            }
            depositETH() {
                return h(this, null, function* () {
                    try {
                        let t = new m.providers.Web3Provider(window.ethereum).getSigner()
                            , n = new m.Contract(S, v, t)
                            , l = this.inputAmount.toString()
                            , pe = yield (yield n.ethdeposit(this.metamaskAddress, {
                                value: m.utils.parseEther(l)
                            })).wait();
                        this.getUserEthBalance()
                    } catch (e) {
                        this.errorMessage = e.message
                    }
                })
            }
            withdrawETH() {
                return h(this, null, function* () {
                    try {
                        let t = new m.providers.Web3Provider(window.ethereum).getSigner()
                            , n = new m.Contract(S, v, t)
                            , l = this.inputAmount.toString()
                            , pe = yield (yield n.withdraw(m.utils.parseEther(l))).wait();
                        this.getUserEthBalance()
                    } catch (e) {
                        this.errorMessage = e.message
                    }
                })
            }
            getUserEthBalance() {
                return h(this, null, function* () {
                    try {
                        let t = new m.providers.Web3Provider(window.ethereum).getSigner()
                            , l = yield new m.Contract(S, v, t).balanceOf(this.metamaskAddress)
                            , s = m.utils.formatEther(l);
                        this.walletBalance = s
                    } catch (e) {
                        this.errorMessage = e.message
                    }
                })
            }
            handleAuth() {
                return h(this, null, function* () {
                    try {
                        let { isConnected: e } = me();
                        if (e && (yield le()),
                            !window.ethereum) {
                            this.snackBarHelperService.open("PLEASE_INSTALL_WEB3_WALLET", "errorBar");
                            return
                        }
                        let t = yield ce({
                            connector: new oe
                        });
                        this.metamaskAddress = t.account,
                            this.keysService.walletAddressSend(this.metamaskAddress).subscribe({
                                next: s => {
                                    s.success && (this.successResponse = s.status,
                                        this.mintButtonDisabled = !0)
                                }
                                ,
                                error: s => {
                                    console.error(s)
                                }
                            }),
                            this.userData = {
                                address: t.account,
                                chain: t.chain.id,
                                network: "evm"
                            },
                            yield ge.request({
                                method: "wallet_addEthereumChain",
                                params: [{
                                    chainId: "0xaa36a7",
                                    chainName: "Sepolia Test Network",
                                    nativeCurrency: {
                                        name: "SepoliaETH",
                                        symbol: "ETH",
                                        decimals: 18
                                    },
                                    rpcUrls: ["https://ethereum-sepolia.blockpi.network/v1/rpc/public"],
                                    blockExplorerUrls: ["https://sepolia.etherscan.io/"]
                                }]
                            });
                        let n = "11155111"
                            , l = String(t.chain?.id);
                        t && l !== n ? (this.session = !1,
                            this.snackBarHelperService.open("PLEASE_CONNECT_TO_SEPOLIA_NETWORK", "errorBar")) : (this.session = !0,
                                this.getUserEthBalance()),
                            this.changeDetectorRef.detectChanges()
                    } catch (e) {
                        console.log(e)
                    }
                })
            }
            static \u0275fac = function (t) {
                return new (t || i)
            }
                ;
            static \u0275cmp = B({
                type: i,
                selectors: [["app-wallet-web3"]],
                decls: 39,
                vars: 22,
                consts: [["appearance", "outlined", 1, "mat-elevation-z6"], [1, "mdc-card"], [1, "header_container"], [1, "metamask-button"], ["mat-raised-button", "", "color", "tertiary", "type", "button", 3, "click"], [1, "confirmation"], ["color", "tertiary", "appearance", "outline", 2, "width", "100%"], ["matInput", "", "type", "number", "id", "inputAmount", "aria-label", "Text field for the withdrawal amount", 3, "ngModelChange", "placeholder", "ngModel"], [1, "error"], [1, "dwbutton_container"], ["type", "submit", "mat-raised-button", "", "color", "primary", "aria-label", "Button to deposit", 1, "deposit_withdraw_button", 3, "click"], ["type", "submit", "mat-raised-button", "", "color", "warning", "aria-label", "Button to withdraw", 1, "deposit_withdraw_button", 3, "click"]],
                template: function (t, n) {
                    t & 1 && (a(0, "mat-card", 0)(1, "div", 1)(2, "div", 2)(3, "h1"),
                        o(4),
                        d(5, "translate"),
                        r(),
                        a(6, "div", 3)(7, "button", 4),
                        g("click", function () {
                            return n.handleAuth()
                        }),
                        a(8, "mat-icon"),
                        o(9, " account_balance_wallet "),
                        r(),
                        x(10, he, 2, 2, "span")(11, fe, 3, 3, "span"),
                        r()()(),
                        a(12, "p")(13, "b")(14, "span"),
                        o(15),
                        d(16, "translate"),
                        r(),
                        a(17, "span", 5),
                        o(18),
                        r()()(),
                        a(19, "div")(20, "mat-form-field", 6)(21, "mat-label"),
                        o(22),
                        d(23, "translate"),
                        r(),
                        a(24, "input", 7),
                        d(25, "translate"),
                        N("ngModelChange", function (s) {
                            return P(n.inputAmount, s) || (n.inputAmount = s),
                                s
                        }),
                        r()(),
                        a(26, "h5", 8),
                        o(27),
                        r()(),
                        a(28, "div", 9)(29, "button", 10),
                        g("click", function () {
                            return n.depositETH()
                        }),
                        a(30, "mat-icon"),
                        o(31, "monetization_on"),
                        r(),
                        o(32),
                        d(33, "translate"),
                        r(),
                        a(34, "button", 11),
                        g("click", function () {
                            return n.withdrawETH()
                        }),
                        a(35, "mat-icon"),
                        o(36, "local_atm"),
                        r(),
                        o(37),
                        d(38, "translate"),
                        r()()()()),
                        t & 2 && (c(4),
                            f(p(5, 10, "TITLE_CRYPTO_WALLET")),
                            c(6),
                            W(n.session ? 10 : 11),
                            c(5),
                            f(p(16, 12, "LABEL_WALLET_BALANCE")),
                            c(3),
                            w(" ", n.walletBalance, " ETH"),
                            c(4),
                            f(p(23, 14, "LABEL_AMOUNT")),
                            c(2),
                            k("placeholder", p(25, 16, "ENTER_ETHER_AMOUNT")),
                            L("ngModel", n.inputAmount),
                            c(3),
                            f(n.errorMessage),
                            c(5),
                            w(" ", p(33, 18, "BTN_DEPOSIT"), " "),
                            c(5),
                            w(" ", p(38, 20, "BTN_WITHDRAW"), " "))
                },
                dependencies: [M, q, C, V, _, ne, te, ee, E, ie, b, J, Z, Q, X, K, z, j],
                styles: [`.header_container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:2rem}.dwbutton_container[_ngcontent-%COMP%]{display:flex;gap:.625rem;justify-content:space-between}mat-card[_ngcontent-%COMP%]{display:block;margin-left:30%;margin-right:30%}mat-form-field[_ngcontent-%COMP%]{padding-top:.625rem;width:100%}.form-container[_ngcontent-%COMP%]{min-width:350px}.deposit_withdraw_button[_ngcontent-%COMP%]{width:100%}.mdc-card[_ngcontent-%COMP%]{border:0}.heading[_ngcontent-%COMP%]{background:#0003;font-size:x-large;justify-content:center;padding:.625rem 1.25rem}@media(max-width:1100px){mat-card[_ngcontent-%COMP%]{margin-left:20%;margin-right:20%}}@media(max-width:580px){mat-card[_ngcontent-%COMP%]{margin-left:10%;margin-right:10%}.header_container[_ngcontent-%COMP%]{flex-direction:column;margin-bottom:1rem}}



`]
            })
        }
        return i
    }
    )();
var we = [{
    path: "",
    component: y
}]
    , it = (() => {
        class i {
            configurationService = u(F);
            overlayContainer = u(U);
            constructor() {
                let e = this.configurationService
                    , t = this.overlayContainer;
                e.getApplicationConfiguration().subscribe(n => {
                    t.getContainerElement().classList.add(n.application.theme + "-theme")
                }
                )
            }
            static \u0275fac = function (t) {
                return new (t || i)
            }
                ;
            static \u0275mod = T({
                type: i
            });
            static \u0275inj = A({
                imports: [H, R.forChild(we), _, b, $, C, M, E, Y, y]
            })
        }
        return i
    }
    )();
export { it as WalletWeb3Module };
