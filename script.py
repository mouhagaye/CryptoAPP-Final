import aiohttp
import asyncio
import requests

async def main():

    async with aiohttp.ClientSession() as session:
        async with session.get('http://localhost:5000/depot') as response:

            res = await response.json()

            # assert await response.json() == {"cookies_are": "working"}

            print(res['message'])
            if res['message']=="complete":
                 loop.stop()
    


loop = asyncio.get_event_loop()
asyncio.ensure_future(main())
loop.run_forever()
