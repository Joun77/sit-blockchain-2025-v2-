// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistry {
    struct Student {
        uint256 id;
        string name;
        string surname;
        string bod; // Date of Birth
        string gender;
        string tel;
        string email;
    }

    Student[] public students;
    mapping(uint256 => uint256) private idToIndex;

    event StudentAdded(uint256 id, string name, string surname);
    event StudentUpdated(uint256 id, string name, string surname);

    function addStudent(
        uint256 _id,
        string memory _name,
        string memory _surname,
        string memory _bod,
        string memory _gender,
        string memory _tel,
        string memory _email
    ) public {
        require(idToIndex[_id] == 0, "Student with this ID already exists");

        students.push(Student(_id, _name, _surname, _bod, _gender, _tel, _email));
        idToIndex[_id] = students.length;

        emit StudentAdded(_id, _name, _surname);
    }

    function updateStudent(
        uint256 _id,
        string memory _name,
        string memory _surname,
        string memory _bod,
        string memory _gender,
        string memory _tel,
        string memory _email
    ) public {
        require(idToIndex[_id] != 0, "Student with this ID does not exist");

        uint256 index = idToIndex[_id] - 1;
        students[index] = Student(_id, _name, _surname, _bod, _gender, _tel, _email);

        emit StudentUpdated(_id, _name, _surname);
    }

    function getStudent(uint256 _id) public view returns (Student memory) {
        require(idToIndex[_id] != 0, "Student with this ID does not exist");

        uint256 index = idToIndex[_id] - 1;
        return students[index];
    }

    function getAllStudents() public view returns (Student[] memory) {
        return students;
    }
}