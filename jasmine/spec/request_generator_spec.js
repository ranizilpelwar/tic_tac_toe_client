applicationMessages = {
    "messages": {
        "welcome": "Welcome to Tic Tac Toe! Let's play a game!",
        "language_configuration_prompt": "If you would like to change languages: ",
        "language_configuration_option": "Press L",
        "language_selection_prompt": "Which language do you want to use?",
        "player_setup_prompt": "What symbol do you want to use for each player?",
        "player_symbol_prompt": "Symbol for Player # [1]:",
        "player_symbol_option": "It can be a letter or a special character on the keyboard.",
        "continue_prompt": "Press any key to continue...",
        "undo_last_move_option": "OR type the letter U to undo the last move.",
        "game_over": "Game Over!",
        "tie_game": "No winners this time. It's a tie!",
        "exit_game": "Press the letter E to exit the game. Goodbye!",
        "player_won": "Player [1] won! Good game!",
        "players_intro": "Players: [1] [ [2] ], [3] [ [4] ]",
        "board_intro": "Tic Tac Toe Board:\n",
        "board_square_selection": "Player [1] picked spot [2]!",
        "undo_completion_for_one_player": "Undo complete!",
        "undo_completion_for_both_players": "Undo complete for both players!",
        "thinking_process_for_computers_turn": "Thinking...",
        "thinking_process_incrementor": ".",
        "next_move_prompt": "Player [1]'s Turn: Where do you want to move?\nType a number that you see on the board.",
        "first_player_of_game_prompt": "Who should play first?",
        "match_selection_prompt": "Who is playing? Please select one of the matches below:\n",
        "match_option_description": "[1] Vs [2]",
        "option_number": "[1]. ",
        "title_of_player_setup_screen": "Player Setup:",
        "title_of_language_options_screen": "Language Setup:",
        "argument_error": "Cannot [1] because [2] is [3].",
        "uniqueness_error": "Oops! I can't use the same one. Try again.",
        "invalid_selection_error": "Oops! I couldn't use that. Please try another key.",
        "invalid_selection_error_for": "Oops! I couldn't use that for the setup of [1]. Please try another key.",
        "language_defaults_error": "ERROR: Unable to use language stored in global settings. Configure it manually.",
        "no_moves_to_undo_error": "There are no moves to undo.",
        "line_spacer": "\n",
        "configure_language": "Configure Language",
        "start_game": "Start Game",
        "player": "Player",
        "go": "Go!",
        "start_new_game": "Start New Game",
        "replay_game_prompt": "Do you want to play again?",
        "human": "Human",
        "computer": "Computer",
        "undo_move": "Undo Move"
    },
    "matches": [
        {
            "player1_type": "Human",
            "player2_type": "Human"
        },
        {
            "player1_type": "Human",
            "player2_type": "Computer"
        },
        {
            "player1_type": "Computer",
            "player2_type": "Computer"
        }
    ],
    "languages": [
        {
            "description": "English",
            "language_tag": "en"
        },
        {
            "description": "Spanish",
            "language_tag": "es"
        }
    ],
    "errors": {
        "error_message": ""
    }
};

describe("A Request Generator", function() {
  describe("method called game", function() {
    it("should return a game object containing the expected format in JSON", function() {
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": -1,
          "last_move_for_player2": -1
        }, 
        "errors": {
          "error_message": ""
        }
      };
      let game = new Game(gameDetails);

      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };

      let players = new Players(gameSetupData);
      
      let request = new RequestGenerator;

      let gameResult = {
                        "game": {
                          "language_tag": "en",
                          "match_number": 2,
                          "player1_symbol": "X",
                          "player2_symbol": "Y",
                          "current_player_symbol": "X",
                          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                          "record_moves": false,
                          "last_move_for_player1": -1,
                          "last_move_for_player2": -1
                        }
          };
      let expectedResult = JSON.stringify(gameResult);

      expect(request.game(game, players)).toEqual(expectedResult);
    });
  });

  describe("method called humanPlayerNextMove", function() {
    it("should return a combined object containing the expected format in JSON", function() {
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": -1,
          "last_move_for_player2": -1
        }, 
        "errors": {
          "error_message": ""
        }
      };
      let game = new Game(gameDetails);

      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };

      let players = new Players(gameSetupData);
      
      let request = new RequestGenerator;

      let humanPlayerNextMoveResult = {
                        "game": {
                          "language_tag": "en",
                          "match_number": 2,
                          "player1_symbol": "X",
                          "player2_symbol": "Y",
                          "current_player_symbol": "X",
                          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                          "record_moves": false,
                          "last_move_for_player1": -1,
                          "last_move_for_player2": -1
                        },
                        "actions": {
                          "tile_on_board": "1"
                        }
          };
      let expectedResult = JSON.stringify(humanPlayerNextMoveResult);

      expect(request.humanPlayerNextMove(game, players, "1")).toEqual(expectedResult);
    });
  });
});