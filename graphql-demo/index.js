// import the required libraries
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// import the data

var data = require('./data.json');

// Define the user type with two String fields: `id` and `name`
// The type of User is a GraphQLObjectType, which has child fields
// with tie own types (in this case, GraphQLString).

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

