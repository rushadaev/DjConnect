import{d as p,o as c,c as _,a as r,t as f,r as v,b as g,e as m,n as b,_ as $,f as C,F,g as G,h as V,w as u,i as l,j as B,u as o}from"./index-6d3f745a.js";const j={class:"flex justify-between items-center p-[10px] h-[66px] bg-lightGrey rounded-[5px]"},w={class:"flex gap-[10px]"},N=["src"],R={class:"flex flex-col justify-center"},z={class:"text-white text-sm"},S={class:"text-[#FFFFFF4D] text-xs"},W=p({__name:"VCard",props:{photo:{},title:{},text:{}},setup(t){return(n,a)=>(c(),_("div",j,[r("div",w,[r("img",{src:n.photo,alt:"photo",class:""},null,8,N),r("div",R,[r("h3",z,f(n.title),1),r("p",S,f(n.text),1)])]),r("div",null,[v(n.$slots,"status")])]))}});var d=(t=>(t.Green="green",t.Red="red",t.Orange="orange",t))(d||{});const D=p({__name:"VStatus",props:{color:{default:d.Green}},setup(t){const n=t,{color:a}=g(n),h=m(()=>a.value===d.Green?"v-status--green":a.value===d.Red?"v-status--red":a.value===d.Orange?"v-status--orange":"");return(e,x)=>(c(),_("div",{class:b(["v-status",[h.value]])},[v(e.$slots,"default",{},void 0,!0)],2))}});const I=$(D,[["__scopeId","data-v-4d6417a2"]]),L=p({__name:"MusicList",setup(t){const n=C([{id:1,photo:"path/to/photo1.jpg",title:"Title 1",text:"Text 1",statusColor:"green",statusText:"Оплачено"},{id:2,photo:"path/to/photo2.jpg",title:"Title 2",text:"Text 2",statusColor:"orange",statusText:"Ожидание"},{id:2,photo:"path/to/photo2.jpg",title:"Title 2",text:"Text 2",statusColor:"red",statusText:"Отменен"}]);return(a,h)=>(c(),_("div",null,[(c(!0),_(F,null,G(n.value,e=>(c(),V(o(W),{key:e.id,photo:e.photo,title:e.title,text:e.text},{status:u(()=>[l(o(I),{color:e.statusColor},{default:u(()=>[B(f(e.statusText),1)]),_:2},1032,["color"])]),_:2},1032,["photo","title","text"]))),128))]))}});var s=(t=>(t.Green="green",t.Blue="blue",t.White="white",t.Red="red",t.None="none",t))(s||{});const M=["size"],O=p({__name:"VButton",props:{color:{default:s.Green},size:{default:"default"}},emits:["click"],setup(t,{emit:n}){const a=n,h=t,{color:e,size:x}=g(h),T=m(()=>e.value===s.Green?"v-button--green":e.value===s.None?"v-button--none":e.value===s.Blue?"v-button--blue":e.value===s.White?"v-button--white":e.value===s.Red?"v-button--red":""),y=()=>{a("click")};return(k,K)=>(c(),_("button",{class:b(["v-button",[T.value]]),size:o(x),onClick:y},[v(k.$slots,"default",{},void 0,!0)],10,M))}});const i=$(O,[["__scopeId","data-v-bd3955e7"]]),E={class:"flex flex-col gap-[20px]"},P=r("p",null,"'button'",-1),q=r("p",null,"'button'",-1),A=r("p",null,"'button'",-1),H=r("p",null,"'button'",-1),J=r("p",null,"'button'",-1),U=p({__name:"MainPage",setup(t){return(n,a)=>(c(),_("div",E,[l(o(L)),l(o(i),{color:o(s).Green},{default:u(()=>[P]),_:1},8,["color"]),l(o(i),{color:o(s).Blue},{default:u(()=>[q]),_:1},8,["color"]),l(o(i),{color:o(s).White},{default:u(()=>[A]),_:1},8,["color"]),l(o(i),{color:o(s).Red},{default:u(()=>[H]),_:1},8,["color"]),l(o(i),{color:o(s).None},{default:u(()=>[J]),_:1},8,["color"])]))}});export{U as default};
