'''
Created on Jul 20, 2019

@author: jlewis
'''

import socket
import time
import os 
from conda.exports import platform
from pip._vendor.urllib3.packages.ssl_match_hostname._implementation import ipaddress
from astropy.wcs.docstrings import row
from mpl_toolkits.axisartist.grid_finder import DictFormatter
import threading
from networkx.algorithms import tournament
import datetime
from _socket import socket
import csv
currentlyInLab = {}

DATAPORT = 4444
BREAKPORT = 90
SWIPECARD = True          #swipe card is active or not



def receive_file_wifi():                                                #accept the incoming wifi socket connection

    socket_listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socket_listener.bind(("",4444))
    socket_listener.listen(4)

    print("Threading WiFi Socket Listener")
    while True:
        connection, addr = socket_listener.accept()
        print("Incoming Wifi Connection Address: " + str(addr))
        filesize = connection.recv(1024)                                #get the file size
        print("Size of Incoming File is " + str(filesize))
        this_file = open("text.txt", 'w')
        data_rec = connection.recv(1024)
        totalrec = len(data_rec)
        this_file.write(str(data_rec.decode('utf-8')))
        while totalrec < int(filesize):
            data_rec = connection.recv(1024)
            data_rec = bytes.decode('utf-8')
            this_file.write(data_rec)
            totalrec = totalrec + len(data_rec)
        print("File Received file at " + str(time.ctime(time.time())))
        this_file.close()
        connection.close()
        
def send_file_wifi():                                                   #wifi send the file over 
    global device
    global default_device
    global incoming_ip
    
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        #s.connect(("127.0.0.1",80))  
    except IndexError:
        print ("exception")

    try:
        print("Sending File WiFi Connecting to IP : " + str(incoming_ip))
                                                      
        s.connect((incoming_ip,4444))
#        print("connected to : " +  nearby[int(device)])
        print("Wifi Connected to "+ str(incoming_ip))
    except IndexError:
        print("Cannot Connect")
        socket.close()
        return
    
    text = open("text.txt","rb")
    data = bytes(str(os.path.getsize("text.txt")),'utf-8')
    s.send(data)
    bytestosend = text.read(1024)
    print("Sending File")
    s.send(bytestosend)
    while bytestosend != b'':
        #print("Sending: "+str(bytestosend))
        bytestosend = text.read(1024)
        s.send(bytestosend)
    print("File Sent")
    s.close()
    
    
class mslsServer():
    
    def __init__(self,localip, port):
        
        self.PORTFORSENDING = port
        self.PORTFORLISTENING = port +1
        self.dictOfSections = {}
        self.socketListener = None
        self.socketClient = None
        self.addressListening = (localip, self.PORTFORLISTENING)
        self.addressSending = (localip, self.PORTFORSENDING)
        self.listOfHUBIPs = []                      #example [ [name,ip] , [name,ip] ]list of all active HUBS and Current IP addresses
        self.getHUBIPsFromNameHUBFile()             #updates the iplist
        
#         self.configSocketListener()
#         self.configSocketClient()
#         self.sections = self.findHubs() #return library of section keys and lock address
            
      
    def configSocketListener(self):     
              
        self.socketListener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socketListener.bind(self.addressListening)
        self.socketListener.listen()
    
    def configSocketClient(self):
        
        self.socketClient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socketClient.bind(self.addressSending)
            
    def getTIME(self):
        
        time0 = datetime.datetime.now()
        return time0.strftime("%Y-%m-%d %H:%M:%S")
    
    def getHUBIPsFromNameHUBFile(self):                     #this keeps track of HUB ips and writes to a file
                                                            #finds the address by network name so hubs need 
                                                            #to be named something meaningful and added to file here
        file0 = open("nameHubFile.txt", "r")
        listOfHUBNames = []
        self.listOfHUBIPs = []
        for row in file0:
            listOfHUBNames.append(row.strip())
        for name in listOfHUBNames:
            try:
                ip = socket.gethostbyname(name)
                self.listOfHUBIPs.append([name,ip])
            except (socket.gaierror) :
                print("none")
                pass
        file0.close()
        
    def writeErrorLog(self, functionName, ipaddress, port):     #writes missed socket connections
        
        logfile = open("CouldNotConnectlogfile.txt", 'a')           #logfile
        logfile.write(ipaddress+" "+ port +" "+ str(self.getTIME()) +" Function: " + functionName + "\n")
        logfile.close()
    
            
    def sendPersonToAllHubs(self, dbDataString):     #onswipe send this dataSting to HUBS that have access  
        #sends a person to HUB library on card swipe
        #Info list is name ips pin *notice the spacing and the commas
        #are there and like this for a reason
        #FORMAT of DBDATASTRING : jacob,lewis<SPACE>192.168.1.3,192.168.1.4,192.168.1.6<SPACE>4433 
        
        thisList = dbDataString.split()             #split spaces [name, ips, pin]
        iplist = thisList[1].split(",")                     # split by comma to sep IP
        for ip in iplist: 
            self.sendBreak(ip)                              #sends break to the HUB
            time.sleep(4)                             #waits for HUB to start HUBServer.py
            self.sendPerson(thisList[0], ip, thisList[2])   # sends the data to an ip 
                                                            #example format name, ip, pin
    def removePersonFromAllHubs(self, dbDataString):
        #onswipe remove person from all HUBS this is a similar process to sendPersonToAllHubs
        thisList = dbDataString.split()                    #split spaces [name, ips, pin]
        ipList = thisList[1].split(",")                    # split by comma to sep IP
        ipList = self.dictOfUsersInLab[thisList[0]]
        for ip in ipList:
            self.sendBreak(ip)
            time.sleep(4)                                  #waits for HUB to start its HUBServer.py
            self.removePerson(thisList[0], ip)             #(name, ip)
        
    def sendPerson(self, name, ipaddress, pin):    
        #this will send the command "new" to HUB Listening on DATAPORT
        #then send the string name and pin
        #example jacob,lewis<SPACE>4444
        ip = ipaddress
        print("connecting to" + str(ip))
        try:
            self.configSocketClient()
            self.socketClient.connect((ipaddress,self.PORTFORSENDING))
        except ConnectionRefusedError:
            print("Couldn't connect")
            self.writeErrorLog("sendPerson", ipaddress, DATAPORT)
            self.socketClient.close()
            self.configSocketClient()
            return
        hubDictString = str(name) + str(pin)
        print(hubDictString)
        command = "new"
        self.socketClient.send(bytes(command,"utf-8"))          #send command to HUB SocketServer
        dataToSend = bytes(hubDictString, "utf-8")              #send string name<space>pin
        lengthOfData = len(dataToSend)
        print(lengthOfData)
        self.socketClient.send(bytes(str(lengthOfData), "utf-8"))
        time.sleep(1)
        while dataToSend != b' ':
            self.socketClient.send(dataToSend)
        time.sleep(5)
        self.socketClient.send(b'exit')                         #exit will kill the program that is running
        self.socketClient.close()                               #the program HUBServer.py updates files for 
    
    def removePerson(self,name,ipaddress):
        
        ip = ipaddress
        print("Connecting to" + str(ip))
        try:
            self.configSocketClient()
            self.socketClient.connect((ipaddress,(self.PORTFORSENDING)))
        except ConnectionRefusedError:
            print("Couldn't connect")
            self.writeErrorLog("removePerson", ipaddress, DATAPORT)
            self.socketClient.close()
            return
        hubDictString = str(name.strip()) 
        print(hubDictString)
        command = "remove"
        self.socketClient.send(bytes(command,"utf-8"))          #send command to HUB SocketServer
        dataToSend = bytes(hubDictString, "utf-8")              #send string name
        lengthOfData = len(dataToSend)
        print(lengthOfData)
        self.socketClient.send(bytes(str(lengthOfData), "utf-8"))
        time.sleep(1)
        while dataToSend != b' ':
            self.socketClient.send(dataToSend)
        time.sleep(5)
        self.socketClient.send(b'exit')                         #exit will kill the program that is running
        self.socketClient.close()                               #the program HUBServer.py updates files for 
         
        
    def sendBreak(self, item): #ip item from listOfHUBIPs [name,ip]
                                                #sends break command to HUBS on port 90 to set a BOOL in encoder.py
                                                # starts os call to HUBServer.py all the while encoder.py turns on DATAPORT 4444 for command
                                                #retrieval, then data if needed. Once  local sock receives "done" from the HUB 
                                                #HUB has finished that command task. Then Local sock sends "exit" back to HUB to kill
                                                #HUBSocketSever.py program
        try:
            sock  = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
            sock.settimeout(15)                             #set timeout
            print("Sending Break to {0:s} , at {1:s}".format(item[0],item[1]))     #[name ip]
            sock.connect((str(item[1]),BREAKPORT))          #break port is 90
            sock.send(bytes("break","utf-8"))
            end  = sock.recv(16)                            #wait for done
            end = bytes.decode("utf-8")
            print(end)
            if end == "done":
                mslsServer.configSocketClient((self.addressSending))
                mslsServer.send(bytes("exit", "utf-8"))                         #sends exit
            sock.close()
                  
        except ConnectionError:
            self.writeErrorLog("sendBreak", item)
            sock.close()
    
                
            
    def receiveClient(self):
        
        print("Running Listener")
    
    def requestDataDump(self):      #requests data file from all HUBS known
                                    #listOfHUBIPs is list of all the HUBS known by msls
        for item in self.listOfHUBIPs:              
            self.sendBreak(item)                #item is [name,ip] of
            time.sleep(4)
            self.configSocketClient()
            try:
                self.socketClient.connect((item[1], self.PORTFORSENDING))
                self.socketClient.send(bytes("dump","utf-8"))
            except ConnectionError:
                print("Couldnt Connect Data dump request")
                self.writeErrorLog("requestDataDump", item[1], self.PORTFORSENDING)
                self.socketClient.close()
                return
            fileName = self.receiveClient(32)
            sizeOfFile =  self.socketClient.recv(8)
            sizeOfFile = int(bytes.decode("utf-8"))
            dataReceived = self.socketClient.recv(1024)
            while len(dataReceived) < sizeOfFile:
                moreData = self.socketClient.recv(1024)
                dataReceived = dataReceived + moreData
            fileName = fileName.decode("utf-8")
            ti = datetime.datetime()
            ti = ti.isoformat()
            fileName = fileName + ti     
            stream = dataReceived.decode("utf-8")
            file0 = open(fileName, "w")
            csvw = csv.writer(file0, dialect="csv")
            csvw.writerows(stream)
            file0.close()
           

def writeEntryLog(listOfData):              #list of data swipe ID time in 
    
    file0 = open("entryLog.csv", 'a')
    temp = ' '
    for item in listOfData:
        temp = temp +","
    file0.write(temp + "\n")
    file0.close()
     
    
def writeExitLog(listOfData):
        
    file0 = open("exitLog.csv", 'a')
    temp = ' '
    for item in listOfData:
        temp = temp +","
    file0.write(temp + "\n")
    file0.close()


    
     
def getSwipe():                 #thread running on machine to get entry and exit data
                                #for reporting
    
    swipe = input()
    #DATABASESTUFF HERE
    
    
    
    
    #http.client\
    dbDataString = "jacob,lewis 192.168.1.7,192.168.1.4 4444" #FORMAT of DBDATASTRING : jacob,lewis<SPACE>192.168.1.3,192.168.1.4,192.168.1.6<SPACE>4433 
    spl = swipe.split(";");    
    selectID = spl[1]
    slc =  selectID[26:] 
    finalStrID = slc[:10]
    print(finalStrID)
    if finalStrID in currentlyInLab.keys():     #they are swiping out correctly; they have swiped in and are now swipeing 
                                                #out
        userTimeList = currentlyInLab[finalStrID]
        if len(list) == 2:
            userTimeList.append(mslsServer.getTIME())       #adds exit time
        writeExitLog(userTimeList)                          #updates the exitLog
        currentlyInLab.remove(finalStrID)
        hostname = socket.gethostname()                     #need this because its a thread
        ipaddress = (socket.gethostbyname(hostname))
        tempMSLS = mslsServer((ipaddress,DATAPORT))
        tempMSLS.removePersonFromAllHubs(dbDataString) # dataBase String Example jacob,lewis 192.168.1.7,192.168.1.4 4444
        return
        
        
    else:                                       #they are swiping in
        currentlyInLab[finalStrID] = [finalStrID, mslsServer.getTIME()]     #entry time
        writeEntryLog(currentlyInLab[finalStrID])                           #writes to entry file
        hostname = socket.gethostname()                 #need this because its a thread
        ipaddress = (socket.gethostbyname(hostname))
        tempMSLS = mslsServer((ipaddress,DATAPORT))
        tempMSLS.sendPersonToAllHubs(dbDataString) # dataBase String Example jacob,lewis 192.168.1.7,192.168.1.4 4444
        return
        
    
def swipeLoop():
    
    while True:
        getSwipe()
        
def runIDInput():                   #get id from keypad
    
    IDInput = input("Enter ID").strip()
    #DATABASE STUFF HERE
    
    
    
    
    #http.client\
    dbDataString = "jacob,lewis 192.168.1.7,192.168.1.4 4444" #FORMAT of DBDATASTRING : jacob,lewis<SPACE>192.168.1.3,192.168.1.4,192.168.1.6<SPACE>4433 
    spl = swipe.split(";");    
    selectID = spl[1]
    slc =  selectID[26:] 
    finalStrID = slc[:10]
    print(finalStrID)
    if finalStrID in currentlyInLab.keys():     #they are swiping out correctly; they have swiped in and are now swipeing 
                                                #out
        userTimeList = currentlyInLab[finalStrID]
        if len(list) == 2:
            userTimeList.append(mslsServer.getTIME())       #adds exit time
        writeExitLog(userTimeList)                          #updates the exitLog
        currentlyInLab.remove(finalStrID)
        
    else:                                       #they are swiping in
        currentlyInLab[finalStrID] = [finalStrID, mslsServer.getTIME()]     #entry time
        writeEntryLog(currentlyInLab[finalStrID])                           #writes to entry file
        hostname = socket.gethostname()                 #need this because its a thread
        ipaddress = (socket.gethostbyname(hostname))
        tempMSLS = mslsServer((ipaddress,DATAPORT))
        tempMSLS.sendPersonToAllHubs(dbDataString) # dataBase String Example jacob,lewis 192.168.1.7,192.168.1.4 4444
        
         
    return
    

if __name__ == '__main__':
    
    sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    hostname = socket.gethostname()    
    ipaddress = (socket.gethostbyname(hostname))        #getting local host IP
    print(ipaddress)
    
    myserver = mslsServer(ipaddress, DATAPORT)              #make my socket service
     
#     myserver.findHubs()
    t = threading.Thread(target = myserver.configSocketListener)        #listens for file dumps to connect
    if(SWIPECARD):
        swipe = threading.Thread(target = swipeLoop)                        #thread to get user data from swipeCard
        swipe.start()

        
    
    while True:
        
        if(SWIPECARD == False):             #if no swipe card get ID from Key Pad
            runIDInput()
            
        #if swipeinfile modified
            #query on using id
            #recieve data back
        
        
        go = input("0")
        if(go == '1'):            
            myserver.sendNewPerson("jacob,lewis 192.168.1.7,192.168.1.4 4444 ")            
        if(go == '2'):
            t.start()            
        if(go == '3'):
            myserver.sendRemovePerson("jacob,lewis")
    
    
    
#  ******************************************   
#     from subprocess import Popen,PIPE,STDOUT,call
# #     os.system("SYSTEMINFO")
#     if (platform == "Windows"):
#         print("windows")
# #     else:
#         proc=Popen('hostname -I', shell=True, stdout=PIPE, )
#         output=proc.communicate()[0]
#         output = str(bytes.decode(output,"utf-8"))
   
  
#     found = 0
#     count = 0
#     for i in output:
#         count = count + 1
#         if i == "wlp3s0":
#             found = 1;
#         if(found == 1 and i == "HWaddr"):
#             MAC = output[count]
#             break;
#     print("mac" + MAC)        
#     
#     
#     
#       
#    
#     ********************************************************************
#    
#    
#     
#     sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
#     hostname = socket.gethostname()    
#     IPAddr = socket.getfqdn(hostname)    
#     print("Your Computer Name is:" + hostname)    
#     print("Your Computer IP Address is:" + str(IPAddr))
#     ipaddress = (socket.gethostbyname(hostname))
#     
#     sock.bind((ipaddress,4444))
#     sock.listen()
#    
#    
#     
#     while True:
#         print(sock.getsockname())
#         connection, addr = sock.accept()
#         data = connection.recv(1024)
#         print(data)
#         
    
    
    
    
    
    
        
    
    
    
    
   