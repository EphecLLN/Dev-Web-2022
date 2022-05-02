@US
Feature: US-8
  In order to communicate with other Players
  As a Player
  I want a group text chat

  Background:
    Given 8 player accounts exist

  Scenario: Players can log into a game
    Given an authentication form is displayed
    And the player is not logged in
    When the player enters their credentials
    Then the player is logged into a game

  Scenario: Players cannot use the chat before logging in
    When the player is not logged in
    Then the player cannot send chat messages

  Scenario: Players can send chat messages to all players
    Given the game has started
    And the player is logged in
    And at least 1 other players are logged in
    When the player sends a message
    Then the player sees the message they sent
    And all other players see the message the player sent

  Scenario: Messages' author can be identified by other players
    Given the game has started
    And the player is logged in
    When the player sends a message
    Then the player's name is next to the message they sent

  Scenario: Most recent messages are displayed by default
    Given the game has started
    And the player is logged in
    When a message is sent
    Then the displays scrolls to the latest message


