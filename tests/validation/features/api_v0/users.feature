@api-v0
Feature: User manipulations

  Background:
    Given the following users exist:
      | id    | pseudo | password |
      | 64537 | rachel | i<3pasta |
      | 59371 | alex   | ovniReal |

  Scenario: Listing users
    Given I make a get request to "/api_v0/user"
    When I receive a response
    Then response has status 200
    And request is successfull
    And response data is:
      | id    | pseudo |
      | 64537 | rachel |
      | 59371 | alex   |

  Scenario: Getting a user
    Given I make a get request to "/api_v0/user/64537"
    When I receive a response
    Then request is successfull
    And response has status 200
    And response data is:
      | id    | pseudo |
      | 64537 | rachel |

  Scenario: Getting a non-existing user
    Given I make a get request to "/api_v0/user/no-such-user"
    When I receive a response
    Then request is failed
    And response has status 404
    And response has no data attached

# TODO: More Scenarios
