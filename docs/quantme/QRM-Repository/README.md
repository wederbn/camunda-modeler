# QRM Repository

In the following the structure of a QRM repository as well as its configuration and usage is shown.

### Configuration

The QRM repository must be a publicly accessible Github repository. 
It can be configured using the [configuration file](../../../resources/plugins/QuantME-ClientPlugin/client/Config.js).
Therefore, `githubUsername` should be used to configure the username or organisation name under which the Github repository is located.
Furthermore, `githubRepositoryName` has to specify the name of the Github repository.

### Structure

The QRM repository can contain an arbitrary number of QRMs, each of which has to be located in a separate folder in the Github repository:

<img src="./repository-overview.png" width="500">

Each of the folders has to contain at least the two files `detector.bpmn` and `replacement.bpmn`, which represent the QRM.
If one of the two files is missing or contains invalid content, the QRM is ignored during transformation.
Additionally, other files can be added to the folders, e.g., a readme file describing the QRM:

![QRM in repository](./repository-folder-content.png)

### Updating the QRM repository

TODO
