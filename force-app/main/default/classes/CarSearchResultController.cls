public with sharing class CarSearchResultController {
    @AuraEnabled (cacheable=true)
    public static List<Car__c> getCars(string CarTypeId){
        
        if(string.isEmpty(CarTypeId))
        {
            return [Select Id,Name,Available_For_Rent__c,Picture__c,Contact__r.Name from Car__c]; 
        }
        else {
            return [Select Id,Name,Available_For_Rent__c,Picture__c from Car__c where Car_Type__c=:CarTypeId and Available_For_Rent__c=true]; 
        }
       
    }
}
