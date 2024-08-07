(function(){"use strict";var e={5029:function(e,t,n){var i=n(5130),o=n(6768);const a={id:"app"};function r(e,t,n,i,r,s){const l=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.CE)("div",a,[(0,o.bF)(l)])}var s={name:"App"},l=n(1241);const c=(0,l.A)(s,[["render",r]]);var u=c,d=n(1387);const p={id:"app"};function h(e,t,n,i,a,r){const s=(0,o.g2)("LoadingAnimation"),l=(0,o.g2)("NavigationBar"),c=(0,o.g2)("MainPage");return(0,o.uX)(),(0,o.CE)("div",p,[a.isLoading?((0,o.uX)(),(0,o.Wv)(s,{key:0})):(0,o.Q3)("",!0),(0,o.bF)(l),a.isLoading?(0,o.Q3)("",!0):((0,o.uX)(),(0,o.Wv)(c,{key:1}))])}n(4603),n(7566),n(8721);const g={class:"navbar"},f={class:"nav-list"},v={class:"nav-item"},m={class:"nav-item"},k={class:"nav-item"};function b(e,t,n,a,r,s){return(0,o.uX)(),(0,o.CE)("nav",g,[(0,o.Lk)("ul",f,[(0,o.Lk)("li",v,[(0,o.Lk)("a",{href:"#",onClick:t[0]||(t[0]=(0,i.D$)((e=>a.navigateTo("/")),["prevent"]))},"Home")]),(0,o.Lk)("li",m,[(0,o.Lk)("a",{href:"#",onClick:t[1]||(t[1]=(0,i.D$)((e=>a.navigateTo("/Map")),["prevent"]))},"Map")]),(0,o.Lk)("li",k,[(0,o.Lk)("a",{href:"#",onClick:t[2]||(t[2]=(0,i.D$)((e=>a.navigateTo("/Blog")),["prevent"]))},"Blog")])])])}n(4114);var y={name:"NavigationBar",setup(){const e=(0,d.rd)(),t=t=>{e.push(t)};return{navigateTo:t}}};const w=(0,l.A)(y,[["render",b],["__scopeId","data-v-1014edf4"]]);var L=w,C=n(4232);const x={class:"loading-container"},A={id:"loading-content"},M={ref:"initialText",class:"loading-text"},I={class:"letter-container"},T={ref:"uLetter",class:"letter"},E={ref:"sLetter",class:"letter"},O={key:0,class:"greeting-text"};function _(e,t,n,i,a,r){return(0,o.uX)(),(0,o.CE)("div",x,[(0,o.Lk)("div",A,[(0,o.Lk)("div",M,[(0,o.Lk)("div",I,[(0,o.Lk)("div",T,"U",512),(0,o.Lk)("div",E,"C",512)]),a.greeting?((0,o.uX)(),(0,o.CE)("div",O,(0,C.v_)(a.greeting),1)):(0,o.Q3)("",!0)],512)])])}var B=n(4968),W={name:"LoadingAnimation",data(){return{greeting:"",greetingInterval:null}},mounted(){this.startAnimation(),this.startGreetingUpdates()},beforeUnmount(){this.greetingInterval&&clearInterval(this.greetingInterval)},methods:{startAnimation(){console.log("Starting animation"),this.tl=B.os.timeline({repeat:-1,repeatDelay:1});const e=this.$refs.uLetter,t=this.$refs.sLetter;this.tl.to([e,t],{delay:.25,rotation:360,scale:1.5,duration:1,ease:"power2.inOut"}).to([e,t],{scale:1,duration:.5,ease:"power2.inOut"},"<").to(e,{x:-100,color:"#00ff00",duration:1,ease:"power2.inOut"}).to(t,{x:115,color:"#ff00ff",duration:1,ease:"power2.inOut"},"<").to([e,t],{x:0,z:0,color:"#ffffff",duration:1,ease:"power2.inOut"}).to(e,{rotation:180,duration:1,ease:"elastic"}).to(t,{rotation:-180,duration:1,ease:"elastic"},"<").to(e,{rotationX:360,z:50,color:"#00ff00",duration:1.5,ease:"back.inOut(1.7)"}).to(t,{rotationY:360,z:50,color:"#ff00ff",duration:1.5,ease:"back.inOut(1.7)"},"<").to([e,t],{rotation:"+=360",color:"#ffffff",duration:1,ease:"power2.inOut"}).to([e,t],{opacity:0,duration:1,ease:"power1.inOut"}).to([e,t],{rotation:0,x:0,y:0,z:0,scale:1,opacity:1,duration:.5,ease:"power1.inOut"})},startGreetingUpdates(){const e=new Worker(new URL(n.p+n.u(183),n.b),{type:void 0});e.onmessage=e=>{console.log("Greeting received:",e.data),this.greeting=e.data},e.postMessage("start"),this.greetingInterval=setInterval((()=>{e.postMessage("start")}),2500)}}};const X=(0,l.A)(W,[["render",_],["__scopeId","data-v-2afd661a"]]);var $=X;const S={class:"loading-container"},U={id:"loading-content"},j={ref:"urbanText",class:"urban-text"},z=(0,o.Fv)('<span class="urban-letter">U</span><span class="urban-letter">r</span><span class="urban-letter">b</span><span class="urban-letter">a</span><span class="urban-letter">n</span>',5),F=[z],P={ref:"chroniclesText",class:"chronicles-text"},Z=(0,o.Fv)('<span class="chronicles-letter">C</span><span class="chronicles-letter">h</span><span class="chronicles-letter">r</span><span class="chronicles-letter">o</span><span class="chronicles-letter">n</span><span class="chronicles-letter">i</span><span class="chronicles-letter">c</span><span class="chronicles-letter">l</span><span class="chronicles-letter">e</span><span class="chronicles-letter">s</span>',10),V=[Z],N={ref:"backgroundImage",class:"background-image"};function Q(e,t,n,i,a,r){return(0,o.uX)(),(0,o.CE)("div",S,[(0,o.Lk)("div",U,[(0,o.Lk)("div",j,F,512),(0,o.Lk)("div",P,V,512)]),(0,o.Lk)("div",N,null,512)])}var R={name:"LoadingAnimation",mounted(){const e=this.$refs.urbanText,t=e.querySelectorAll(".urban-letter"),n=this.$refs.chroniclesText,i=n.querySelectorAll(".chronicles-letter"),o=this.$refs.backgroundImage,a=B.os.timeline();a.fromTo(t,{opacity:0,y:20,color:"white"},{opacity:1,y:0,color:"white",stagger:.1,duration:1}),a.fromTo(i,{opacity:0,y:20,color:"white"},{opacity:1,y:0,color:"white",stagger:.1,duration:1},"-=0.5"),a.to(o,{opacity:1,duration:3,ease:"power1.inOut"}),a.to(t,{textShadow:"1px 1px 20px black",color:"#00ff00",duration:1,delay:1.5,stagger:.1},"-=2.5"),a.to(i,{textShadow:"1px 1px 20px black",color:"#ff00ff",duration:1,delay:1.5,stagger:.1},"-=2.5")}};const G=(0,l.A)(R,[["render",Q]]);var D=G,H={name:"App",components:{NavigationBar:L,LoadingAnimation:$,MainPage:D},data(){return{isLoading:!0}},mounted(){this.startWorker()},methods:{startWorker(){const e=new Worker(new URL(n.p+n.u(749),n.b),{type:void 0});e.onmessage=e=>{e.data.done&&(this.isLoading=!1)},e.postMessage("start")}}};const Y=(0,l.A)(H,[["render",h]]);var q=Y;function K(e,t,n,i,a,r){const s=(0,o.g2)("NavigationBar"),l=(0,o.g2)("OpenLayers");return(0,o.uX)(),(0,o.CE)("div",null,[(0,o.bF)(s),(0,o.bF)(l)])}const J={class:"full-container"},ee={ref:"mapContainer",class:"map-container"},te={key:1,class:"sidebar"},ne=["href","onClick"],ie=["href"],oe={key:3,class:"error-box"};function ae(e,t,n,i,a,r){const s=(0,o.g2)("LoadingAnimation");return(0,o.uX)(),(0,o.CE)("div",J,[a.loading?((0,o.uX)(),(0,o.Wv)(s,{key:0})):(0,o.Q3)("",!0),(0,o.Lk)("button",{class:"toggle-button",onClick:t[0]||(t[0]=(...e)=>r.toggleSidebar&&r.toggleSidebar(...e))},(0,C.v_)(a.isSidebarVisible?"All Wikipedia Links":"Close"),1),(0,o.Lk)("div",ee,null,512),a.isSidebarVisible?(0,o.Q3)("",!0):((0,o.uX)(),(0,o.CE)("div",te,[(0,o.Lk)("ul",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(a.cities,(e=>((0,o.uX)(),(0,o.CE)("li",{key:e.name},[(0,o.Lk)("a",{href:r.formatWikipediaUrl(e.wikipedia),target:"_blank",rel:"noopener noreferrer",onClick:t=>r.trackSidebarLinkClick(e.wikipedia)},(0,C.v_)(e.name),9,ne)])))),128))])])),a.selectedCity?((0,o.uX)(),(0,o.CE)("div",{key:2,class:"info-box",style:(0,C.Tr)({top:a.infoBoxPosition.top+"px",left:a.infoBoxPosition.left+"px"})},[(0,o.Lk)("h3",null,(0,C.v_)(a.selectedCity.name),1),(0,o.Lk)("p",null,[(0,o.Lk)("a",{href:a.selectedCity.wikipedia,target:"_blank",rel:"noopener noreferrer",onClick:t[1]||(t[1]=e=>r.trackSidebarLinkClick(a.selectedCity.wikipedia))}," Wikipedia Link ",8,ie)])],4)):(0,o.Q3)("",!0),a.error?((0,o.uX)(),(0,o.CE)("div",oe,[(0,o.Lk)("p",null,(0,C.v_)(a.error),1)])):(0,o.Q3)("",!0)])}n(2488);var re=n(2506),se=n(8699),le=n(4336),ce=n(1242),ue=n(631),de=n(9073),pe=n(6505),he=n(2375),ge=n(856),fe=n(8225),ve=n(8075),me=n(7425),ke=n(2535);const be=new URL(n(6453),n.b);var ye={components:{LoadingAnimation:$},data(){return{map:null,cityLayer:null,selectedCity:null,infoBoxPosition:{top:0,left:0},worker:null,error:null,isSidebarVisible:!0,cities:[],loading:!0,isMapIdle:!0,mapIdleTimeout:null,zoomChangeTimeout:null,isZooming:!1}},mounted(){this.initializeMap(),this.initializeWorker()},beforeUnmount(){this.worker&&this.worker.terminate()},methods:{formatWikipediaUrl(e){return!e||e.startsWith("http://")||e.startsWith("https://")?e:`https://${e}`},trackEvent(e,t,n=""){this.$gtag?this.$gtag.event(t,{event_category:e,event_label:n}):console.warn("Google Analytics not available. Event not tracked.")},trackSidebarLinkClick(e){this.trackEvent("Sidebar Interaction","Click Link",`${e}`)},initializeWorker(){window.Worker?(this.worker=new Worker(be,{type:"module"}),this.worker.onmessage=e=>{const t=e.data;if(t.error)return this.error=t.error,console.error(t.error),void this.trackEvent("Worker Interaction","Error",t.error);this.processCities(t),this.loading=!1},this.worker.postMessage({username:"hebbrechtarne"})):console.error("Web Workers are not supported in this browser.")},processCities(e){this.cities=e;const t=e.map((e=>{let t=e.wikipedia;return t&&!t.startsWith("http")&&(t=`https://${t}`),new ge.A({geometry:new fe.A((0,ve.Rb)([e.lng,e.lat])),name:e.name,wikipedia:t,info:`${e.name}, ${e.adminName1}, ${e.countryName}`})})),n=new de.A({features:t});this.cityLayer&&this.map.removeLayer(this.cityLayer),this.cityLayer=new ce.A({source:n,style:new pe.Ay({image:new he.A({anchor:[.5,1],anchorXUnits:"fraction",anchorYUnits:"fraction",src:"https://openlayers.org/en/latest/examples/data/icon.png",scale:1})})}),this.map.addLayer(this.cityLayer);const i=new me.A({condition:ke.jM,style:new pe.Ay({image:new he.A({anchor:[.5,1],anchorXUnits:"fraction",anchorYUnits:"fraction",src:"https://openlayers.org/en/latest/examples/data/icon.png",scale:1})})});this.map.addInteraction(i),i.on("select",(e=>{if(e.selected.length>0){const t=e.selected[0];this.selectedCity={name:t.get("name"),wikipedia:t.get("wikipedia"),info:t.get("info")},this.updateInfoBoxPosition(e.mapBrowserEvent.pixel),this.trackEvent("Map Interaction","Select City",t.get("name"))}else this.selectedCity=null}))},initializeMap(){this.map=new re.A({target:this.$refs.mapContainer,layers:[new le.A({source:new ue.A})],view:new se.Ay({center:(0,ve.Rb)([4.5,50.5]),zoom:7})});const e=this.map.getView();e.on("change:center",this.debounceOrThrottleMapMove),e.on("change:resolution",this.debounceOrThrottleZoomChange)},debounceOrThrottleMapMove(){this.isZooming||(this.mapIdleTimeout&&clearTimeout(this.mapIdleTimeout),this.mapIdleTimeout=setTimeout((()=>{this.isMapIdle=!0,this.handleMapMove()}),300))},debounceOrThrottleZoomChange(){this.zoomChangeTimeout&&clearTimeout(this.zoomChangeTimeout),this.zoomChangeTimeout=setTimeout((()=>{this.handleZoomChange()}),300)},handleMapMove(){if(this.isMapIdle){const e=this.map.getView().getCenter(),[t,n]=(0,ve.WP)(e);this.trackEvent("Map Interaction","Map Moved",`Longitude: ${t.toFixed(6)}, Latitude: ${n.toFixed(6)}`),this.isMapIdle=!1}},handleZoomChange(){if(!this.isZooming){this.isZooming=!0;const e=this.map.getView().getZoom();this.trackEvent("Map Interaction","Zoom Changed",`Zoom Level: ${e}`),this.isZooming=!1}},updateInfoBoxPosition(e){const t=this.$refs.mapContainer,n=t.getBoundingClientRect();this.infoBoxPosition={top:e[1]+n.top,left:e[0]+n.left+10},this.selectedCity&&this.trackEvent("Info Box","Display",this.selectedCity.name)},toggleSidebar(){this.isSidebarVisible=!this.isSidebarVisible}}};const we=(0,l.A)(ye,[["render",ae],["__scopeId","data-v-55709fd0"]]);var Le=we,Ce={name:"MapView",components:{NavigationBar:L,OpenLayers:Le}};const xe=(0,l.A)(Ce,[["render",K]]);var Ae=xe;const Me={id:"app"};function Ie(e,t,n,i,a,r){const s=(0,o.g2)("NavigationBar"),l=(0,o.g2)("BlogComponent");return(0,o.uX)(),(0,o.CE)("div",Me,[(0,o.bF)(s),(0,o.bF)(l)])}const Te=e=>((0,o.Qi)("data-v-3ad949e6"),e=e(),(0,o.jt)(),e),Ee={class:"blog"},Oe=Te((()=>(0,o.Lk)("h1",null,"Mijn Blog",-1)));function _e(e,t,n,i,a,r){return(0,o.uX)(),(0,o.CE)("div",Ee,[Oe,(0,o.Lk)("ul",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(a.posts,(e=>((0,o.uX)(),(0,o.CE)("li",{key:e.id},[(0,o.Lk)("h2",null,(0,C.v_)(e.title),1),(0,o.Lk)("p",null,(0,C.v_)(e.content),1)])))),128))])])}var Be={data(){return{posts:[{id:1,title:"Wat ik geleerd heb over Vue.js",content:"Inhoud van de blogpost..."},{id:2,title:"Mijn ervaringen met tutorials",content:"Inhoud van de blogpost..."}]}}};const We=(0,l.A)(Be,[["render",_e],["__scopeId","data-v-3ad949e6"]]);var Xe=We,$e={name:"App",components:{BlogComponent:Xe,NavigationBar:L}};const Se=(0,l.A)($e,[["render",Ie]]);var Ue=Se;const je=[{path:"/",name:"Home",component:q},{path:"/Map",name:"Map",component:Ae},{path:"/Blog",name:"Blog",component:Ue}],ze=(0,d.aE)({history:(0,d.LA)("/"),routes:je});var Fe=ze,Pe=n(1390),Ze=n(758);const Ve=(0,i.Ef)(u);Ve.use(Pe.Ay,{id:"GTM-M85V9HMH",vueRouter:Fe}),Ve.use(Ze.Ay,{property:{id:"G-QYPTTM8R73"}},Fe),Ve.use(Fe).mount("#app")},6453:function(e,t,n){e.exports=n.p+"a8b93e9d2168cdf7.js"}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,i,o,a){if(!i){var r=1/0;for(u=0;u<e.length;u++){i=e[u][0],o=e[u][1],a=e[u][2];for(var s=!0,l=0;l<i.length;l++)(!1&a||r>=a)&&Object.keys(n.O).every((function(e){return n.O[e](i[l])}))?i.splice(l--,1):(s=!1,a<r&&(r=a));if(s){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[i,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.u=function(e){return"js/"+e+"."+{183:"d094c856",749:"c845547d"}[e]+".js"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.p="/"}(),function(){n.b=document.baseURI||self.location.href;var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var o,a,r=i[0],s=i[1],l=i[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)var u=l(n)}for(t&&t(i);c<r.length;c++)a=r[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},i=self["webpackChunkweb_topics2023_2024_ep3"]=self["webpackChunkweb_topics2023_2024_ep3"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[504],(function(){return n(5029)}));i=n.O(i)})();
//# sourceMappingURL=app.63b1afea.js.map