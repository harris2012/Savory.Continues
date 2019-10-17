using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Web;

namespace Savory.Continues
{
    public class ConnectionProvider
    {
        static string sqliteConnString = @"Data Source=D:\HarrisData\SavoryContinues.db3;Version=3";

        public static SQLiteConnection GetSqliteConn()
        {
            var sqliteConn = new SQLiteConnection(sqliteConnString);
            sqliteConn.Open();

            return sqliteConn;
        }
    }
}