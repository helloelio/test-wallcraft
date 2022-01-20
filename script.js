const burgerButton=document.querySelector(".btn-burger"),burgerMenu=document.querySelector(".burger"),defaultTimer=9e3;burgerButton.addEventListener("click",()=>{burgerMenu.classList.toggle("opened")});const persons=[{id:1,name:"Mark",voices:0,percents:0},{id:2,name:"Jacob",voices:0,percents:0},{id:3,name:"Larry",voices:0,percents:0},{id:4,name:"ASD",voices:0,percents:0}];class TableComponent extends React.Component{constructor(e){super(e),this.state={persons:[],allVoices:0,winner:{},res:!1}}componentWillMount(){this.setState({persons:this.props.persons});let e=setInterval(()=>{var e=Math.random(),e=e>1/this.props.persons.length&&Math.floor(e*this.props.persons.length);0==e||(this.state.persons[e].voices+=1)},10),t=setInterval(()=>{this.setState({persons:this.state.persons.sort((e,t)=>t.voices-e.voices)}),this.state.persons.map(e=>{this.setState({allVoices:this.state.allVoices+=e.voices})}),this.state.persons.map(e=>{e.percents=(e.voices/(this.state.allVoices/100)).toFixed(2)}),this.setState({allVoices:0})},1e3);setTimeout(()=>{clearInterval(e),clearInterval(t),this.render()},defaultTimer),setTimeout(()=>{const t=[];this.state.persons.map(e=>{t.push(e.voices)});let s=t[0];for(let e=0;e<t.length;e+=1)t[e]>s&&(s=arr[e]);this.state.persons.map(e=>e.voices==s?this.setState({winner:e}):""),this.setState({res:!0})},9e3)}render(){return React.createElement("div",null,React.createElement("h2",{className:"elections__title"},"Elections"," ",1==this.state.res?"winner - "+this.state.winner.name:""),React.createElement(Timer,null),React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"#"),React.createElement("th",null,"Name"),React.createElement("th",null,"Voices"),React.createElement("th",null,"percents"))),React.createElement("tbody",null,this.state.persons.map((e,t)=>React.createElement(PersonItem,{person:e,key:t,id:t})))))}}class PersonItem extends React.Component{constructor(e){super(e),this.state={person:{}}}componentWillMount(){let e=setInterval(()=>this.setState({person:this.props.person})&&this.render(),1e3);setTimeout(()=>clearInterval(e),defaultTimer)}render(){return React.createElement("tr",null,React.createElement("th",null,this.props.id+1),React.createElement("th",null,this.props.person.name),React.createElement("th",null,this.props.person.voices),React.createElement("th",null,this.props.person.percents,"%"))}}class Timer extends React.Component{constructor(){super(),this.state={timer:9,timerEnd:!1}}componentWillMount(){let e=setInterval(()=>this.setState({timer:--this.state.timer}),1e3);setTimeout(()=>{clearInterval(e),this.setState({timerEnd:!0})},9e3)}render(){return this.state.timerEnd?React.createElement("div",{className:"timer"},"Time is over"):React.createElement("div",{className:"timer"},"Time left: ",this.state.timer," sec")}}class App extends React.Component{render(){return React.createElement("div",null,React.createElement(React.StrictMode,null,React.createElement(TableComponent,{persons:persons})))}}ReactDOM.render(React.createElement(App,null),document.querySelector("#elections-main"));