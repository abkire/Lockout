'''
Created on Aug 6, 2019

@author: Jacob
'''

while True:
    swipe = input()
    print(swipe)
    spl = swipe.split(";");
    
    selectID = spl[1]
    print(selectID)
    slc =  selectID[26:] 
    print(slc)
    slc = slc[:10]
    print(slc)
    