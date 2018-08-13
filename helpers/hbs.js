module.exports = {

	PagesGreaterThanZero: function(pages){
       if(pages > 1){
       	 return true;
       }
	},
	CurrentPage: function(current){
		if(current == 1){
			return true;
		}
	},
	NextPage: function(current){
       let currentInt = parseInt(current);

       return currentInt + 1;
	},
	PrePage: function(current){
       let currentInt = parseInt(current);

       return currentInt - 1;
	},
	HasPre: function(){

		if(this.PrePage >= 1){
			return true;
		}else{
			return false
		}
	},
	HasNext: function(pages){

        if(this.NextPage <= pages){
        	return true;
        }else{
        	return false;
        }
	},
	ForLoop: function(pages , current){
        for(let i = 0 ; i <= pages ;){
        	if(i == current){
        		return current;
        	}else{
              return i;
        	}
        }
	}
}
