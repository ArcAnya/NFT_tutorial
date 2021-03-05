pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Color is
    ERC721Full // inheriting from ERC 721
{
    string[] public colors; // creating array to store the colors - this is array called "colors" of strings
    // by using "public" here, Solidity gives us a function called "colors" that allows us to use this array

    mapping(string => bool) _colorExists;

    // mapping is somewhat like hash or object, with key value pair
    // _colorExists is like a lookup (e.g. color ="#FFFFFF" => should only be minted once)

    constructor() public ERC721Full("Color", "COLOR") {
        // 1. function that is run whenever smart contract deployed to the Blockchain for the 1st time
        // 2. in this case, ERC721 wants a "name" and a "symbol" as arguments (check imported smart contract)
        // 3. public => need to know visibility, this means can be called outside of the smart contract
    }

    function mint(string memory _color) public {
        //CAREFUL: in real life RESTRICT to admin or owner (not public!)
        // _color => is variable, with _ by convention because local variable

        require(!_colorExists[_color]); // creates a guard
        // Require unique color - reading value out of the mapping
        // if not true, it defaults to false, and the rest of function mint doesn't get completed
        // if exists, will return true (see last line of code in mint)

        uint256 _id = colors.push(_color);
        // when function pushes to the array, it returns the index, so store this index into _id to be able to mint token

        _mint(msg.sender, _id);
        // Call the mint function, msg.sender = the one who calls the function

        _colorExists[_color] = true; // checking whether this color already exists

        // track Color
    }
}
