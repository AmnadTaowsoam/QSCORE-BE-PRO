# Introduction 
Qscore นี้เป็นส่วนที่ให้บริการ การclustering Vendor ที่ Supply วัตถุดิบที่ใช้ในการผลิตอาหารสัตว์ โดยทำหน้าที่ในการแยก คัดกรอง Vendor ที่มีประวัติคุณภาพที่ดี และส่งให้กับผู้ใช้งานผ่านหน้า UI

# Getting Started
1.	Installation process
    
    - python environment:

            python -m venv env
            env\scripts\activate

    - Library requirements:

            pip install -r requirements.txt

2.	Software dependencies

        Linux/Ubuntu
        Docker container
        python

3.	Latest releases

        https://betagro-dev@dev.azure.com/betagro-dev/D2023-006-QI-Inspection/_git/QSCORE-BE

4.	API references

# Build and Test

## Create Images

    docker build -t qsore_serv:latest .

## Run Images

    docker run -d -p 8002:8002 --name qsore_serv qsore_serv:latest


# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)