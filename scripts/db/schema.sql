CREATE TABLE users
(
    id         INTEGER PRIMARY KEY AUTO_INCREMENT,
    username   VARCHAR(255) NOT NULL UNIQUE,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    phone      VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE agreements
(
    id         INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id    INTEGER NOT NULL,
    signed_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE funds
(
    id         INTEGER PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255)   NOT NULL,
    nav        DECIMAL(10, 4) NOT NULL,
    fee        DECIMAL(10, 4) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE orders
(
    id         INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id    INTEGER                                              NOT NULL,
    fund_id    INTEGER                                              NOT NULL,
    amount     DECIMAL(10, 4)                                       NOT NULL,
    status     ENUM ('pending', 'completed', 'failed', 'cancelled') NOT NULL DEFAULT 'pending',
    created_at DATETIME                                                      DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME                                                      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE accounts
(
    id         INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id    INTEGER        NOT NULL,
    balance    DECIMAL(10, 4) NOT NULL DEFAULT 0,
    created_at DATETIME                DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME                DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE user_funds
(
    user_id    INTEGER        NOT NULL,
    fund_id    INTEGER        NOT NULL,
    units      DECIMAL(10, 4) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME
);

CREATE TABLE transactions
(
    id         INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id    INTEGER                      NOT NULL,
    type       ENUM ('deposit', 'withdraw') NOT NULL,
    amount     DECIMAL(10, 4)               NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);