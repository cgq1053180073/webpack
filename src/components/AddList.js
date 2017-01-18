import React,{Component} from "react";



class Li extends Component {
	
	render (){
		return <li>{this.context.color}</li>
	}
}

Li.contextTypes = {
	color : React.PropTypes.string
}


class List extends Component {
	render(){
		return (
			<ul>
			   <Li/>
			   {
			   	this.props.data.map(function(v){
                  return <li key={v.id}>{v.text}</li>
			   })
			   }
			</ul>
			  )
	}
}



export default class AddList extends Component { 
    constructor(props){
        super(props) 
        this.state = {
           data:[]
        }
    } 

    addClick = ()=>{
        let temp = this.state.data
        temp.push({
        	text:this.refs.text.value,
        	id:Date.now() 
        }) 
        this.setState({
        	data: temp
        })
    }
    


    getChildContext(){
    	return {
    		color:'red' 
    	}
    }


	 render(){
	 	return (
	 		     <div>
	 		     <h1>点击添加数据</h1>
	 		     <List data={this.state.data} />
	 		     <input type="text" ref="text"/>
	 		     <input type="button" value="添加" onClick={this.addClick}/>
	 		     </div>
	 		   ); 
	 }
}

AddList.childContextTypes = {
	color:React.PropTypes.string
}
