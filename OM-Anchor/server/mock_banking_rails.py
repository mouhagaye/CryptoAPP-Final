"""
This module contains a fake banking rails interface to use for the purposes of
this example anchor server. In reality, the anchor should use whatever interface
connects them with their real bank account.
"""
from uuid import uuid4
from decimal import Decimal
from polaris.integrations import transactions
from polaris.models import Transaction
import requests
import aiohttp
import asyncio
import requests
import time
# import asyncio
# from time import sleep
# import httpx
# from django.http import HttpResponse

# async def http_call_async():
#   for num in range(1,6):
#     await asyncio.sleep(1)
#     print(num)
#   async with httpx.AsyncClient() as client:
#     r = await client.get("http://localhost:5000/depot")
#     return r.json()

# async def getstatus():
#     async with aiohttp.ClientSession() as session:
#         async with session.get('http://localhost:5000/depot') as response:

#             res = await response.json()

#             # assert await response.json() == {"cookies_are": "working"}

#             print(res['message'])
#             if res['message']=="complete":
#                     loop.stop()
#                     return "complete"
# loop = asyncio.get_event_loop()
# asyncio.ensure_future(getstatus)
# loop.run_forever()


class BankAccount:
    def __init__(self, account_id: str):
        self.id = account_id

class ClientAccount:
    def __init__(self, account_id: str):
        self.id = account_id


class BankTransaction:
    def __init__(self, to_account: BankAccount, amount: Decimal, memo: str, status:str):
        self.id = str(uuid4())
        self.to_account = to_account
        self.from_account = BankAccount(str(uuid4()))
        self.amount = amount
        self.memo = memo
        self.status = status
        
        # self.status = http_call_async()
        # print("self.status"+self.status)
    
                        
    
        
        


class BankAPIClient:
    def __init__(self, account_id,transaction_id):
        self.account = BankAccount(account_id)
        self.transaction_id = transaction_id


    def get_deposit(self, deposit):
        # print('number_phone', deposit.number_phone)
        print('amount', deposit.amount_in)
        print('numberphone account', self.account.id)
    
        """
        A fake banking rails function for retrieving a RailsTransaction object.

        When a deposit is initiated by making a POST /deposit/interactive call,
        we (the anchor) display instructions with a fake `memo` string that the
        user would (in theory) use when making the deposit to the anchor's
        account. However when passed the `deposit` Transaction object, we simply
        return a fake BankTransaction object for the purposes of providing an
        example.

        Then, when polling the bank for new deposits into the anchor's account,
        we identify a Transaction database object using the memo originally
        displayed to the user.

        This is intended to be an example for how a real anchor would poll the
        anchors bank and identify a deposit from a particular user.
        """
        # print(BankTransaction(self.account, deposit.amount_in, deposit.memo))
        # print(self.transaction_id)
        

        statut = "pending"
        tmp = 0

        r= requests.get('http://localhost:5000/depot')
        if r.text == "complete":
            statut = r.text
        print("status ============ "+statut)
        try:
            if statut == "pending":
                x = requests.post('http://localhost:5000/getdepot', json={"transaction_id": str(self.transaction_id), "numero" : str(self.account.id),"montant": str(deposit.amount_in), "status": "pending"})
                print(x)
        except:
            print("transaction incorrect")
        if statut == "complete":
            return BankTransaction(self.account, deposit.amount_in, deposit.memo, statut)

    def send_funds(self, to_account: str, amount: Decimal):
        """
        A fake function to symbolize sending money from an anchor's bank
        account to the user's bank account.
        """
        print (to_account,amount)
        return {"success": True}
