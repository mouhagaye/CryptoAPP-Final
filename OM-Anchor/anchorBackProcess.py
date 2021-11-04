import os
os.system("python manage.py runsslserver 9000")
os.system("python manage.py poll_pending_deposits --loop")
os.system("python manage.py watch_transactions")
os.system("python manage.py poll_outgoing_transactions --loop")
os.system("python manage.py execute_outgoing_transactions --loop")