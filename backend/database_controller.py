import psycopg2
from psycopg2.extras import RealDictCursor

class DatabaseController:
    def __init__(self):
        self.dsn = 'postgres://avnadmin:AVNS_GxIJiNsCvfbaAC1v2Zf@test-projects-databases-projects.b.aivencloud.com:14420/Subastas?sslmode=require'
        self.connection = None

    def connect(self):
        try:
            self.connection = psycopg2.connect(self.dsn, cursor_factory=RealDictCursor)
        except Exception as e:
            print(f"Error connecting to the database: {e}")
            raise

    def close(self):
        if self.connection:
            self.connection.close()

    def query(self, query_sql, params=None):
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