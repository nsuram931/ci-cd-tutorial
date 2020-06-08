import { LightningElement,track,wire } from 'lwc';
import getCarTypes from "@salesforce/apex/GetCarTypes.getCarTypes";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
/*Please include as suffix on this JS class as extends NavigationMixin(LightningElement) instead of LightningElement*/
import { NavigationMixin } from 'lightning/navigation';

export default class CarSearchForm extends NavigationMixin(LightningElement) {
        
    @track carTypes;
    @track selectedCarId;
    @wire(getCarTypes)
    wiredCarTypes({data,error}){
      if(data){
        this.carTypes=[{value:'', label:'All Types'}];
        data.forEach(element => {
          const carType={};
          carType.label=element.Name;
          carType.value=element.Id;
          this.carTypes.push(carType);
          
        });
      }else if(error){
        const toastEvent = new ShowToastEvent({
          title:'ERROR',
          message:error.body.message,
          variant:'error',

      })
      this.dispatchEvent(toastEvent);
        

      }
    }
    
    handlecarTypes(event){
      const carTypeId=event.detail.value;
      console.log('Selected Card Type Id', carTypeId);
      const carTypeChangeSelectEvent=new CustomEvent('cartypeselect', {detail: carTypeId});
      this.dispatchEvent(carTypeChangeSelectEvent);

    }
    createNewCarType(){
      /*import { NavigationMixin } from 'lightning/navigation';
      classname extends NavigationMixin(LightningElement)*/
                this[NavigationMixin.Navigate]({
              type: 'standard__objectPage',
              attributes: {
                  objectApiName: "Car_Type__C",// objectApiName is optional
                  actionName: "new"
              }
          });
      

    }
    
    
}