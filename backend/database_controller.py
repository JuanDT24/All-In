import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

class DatabaseController:

    def __init__(self):
        load_dotenv()
        self.dsn = os.getenv("DB_PASSWORD")
        self.connection = None

    def connect(self):
        try:
            self.connection = psycopg2.connect(self.dsn, cursor_factory=RealDictCursor)
        except Exception as e:
            print(f"Error connecting to the database: {e}")
            raise

    def close(self):
        if self.connection and not self.connection.closed:
            self.connection.close()

    def query(self, query_sql, params=None):
        self.ensure_connection()
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query_sql, params)
                if query_sql.strip().upper().startswith("SELECT"):
                    return cursor.fetchall()
                else:
                    self.connection.commit()
        except Exception as e:
            print(f"Error executing query: {e}")
            raise

    def ensure_connection(self):
        if not self.connection or self.connection.closed:
            self.connect()

### Instancia única            
client = DatabaseController()
client2 = DatabaseController()
client3 = DatabaseController()

clients1 = DatabaseController()
clients2 = DatabaseController()
clients3 = DatabaseController()
clients4 = DatabaseController()
clients = []
clients.append(clients1)
clients.append(clients2)
clients.append(clients3)
clients.append(clients4)