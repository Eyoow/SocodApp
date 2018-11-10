
function filterResults(array,key,lower_bound,upper_bound = 0){
    if(upper_bound !=0){
        return array.filter(item => item.key >= lower_bound && item.key <= upper_bound);
    }
    else{
        return array.filter(item => item.key =lower_bound);
    }
}