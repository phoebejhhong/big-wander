# Schema Information

## galleries
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
description | text      |

## pano_items
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
gellery_id  | integer   | not null, foreign key (references galleries)
title       | string    | not null
lat         | decimal   | not null
lng         | decimal   | not null
heading     | decimal   | not null
pitch       | decimal   | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
pano_item_id   | integer   | not null, foreign key (references pano_items)
tag_id         | integer   | not null, foreign key (references tags)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
