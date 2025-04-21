-- 루트 사용자 비밀번호 설정 (mysql_native_password 방식)
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '0328';

-- 필요한 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS myboard;