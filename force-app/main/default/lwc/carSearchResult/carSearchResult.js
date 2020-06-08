import { LightningElement,api,wire,track } from 'lwc';
import getCars from "@salesforce/apex/CarSearchResultController.getCars";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class CarSearchResult extends LightningElement {
    @api carTypeId;
    @track cars;    
   
    @wire(getCars,{CarTypeId: '$carTypeId'})
    wiredCars({data, error}){
           if(data){
               this.cars = data;
               this.error = undefined;
           }
            else if (error) {
                console.error('error in getting cars from apex',error.body.message);
                 this.dispatchEvent(new ShowToastEvent({
                    title: 'ERROR',
                    message: error.body.message,
                    variant: 'error' //variant can be error
                }));
            }
        }
        get carsFound(){
            if(this.cars){
                return true;
            }
            return false;
        }
}