# CDK 中文勝經

給那些想入門 CDK，卻不知道在從啥的人

立誌成為 CDK 界的鳥哥 ><

## Purpose
跟隨 AWSLC 一起探索 CDK 的魅力吧！



## CDK Architecture


![](./pictures/AppStacks.png)

## Resources

* [Github Repository](https://github.com/aws-samples/aws-cdk-examples)
*  [CDK Toolkit](https://docs.aws.amazon.com/cdk/v2/guide/cli.html)(used to interact with CDK APP)
*  [Construct Library](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html) (offers constructs for each AWS service, many with "rich" APIs that provide high-level abstractions. The aim of the AWS Construct Library is to reduce the complexity and glue logic required when integrating various AWS services to achieve your goals on AWS.)
*  The Construct Programming Model -

The Construct Programming Model (CPM) extends the concepts behind the AWS CDK into additional domains. Other tools using the CPM include:

* [CDK for Terraform](https://www.terraform.io/docs/cdktf/index.html)(cdktf)
* [CDK for Kubernetes](https://cdk8s.io/)（cdk8s)
* [Projen](https://github.com/projen/projen)




## Concepts
### Construct

你可以把它理解成你在 AWS 單一個一個資源或是服務，如你在 AWS launch 了一臺 EC2 instance，我們就可以把它理解成一個 **construct** 的概念。但你以為就這麼單純嗎？>< 

變相來說，construct 也是可以理解成 "一些 AWS 資源和服務串接組合而成的一個抽象概念，如若是我將 API Gateway 與 Lambda 做連接"，我也可以將其概念理解成 construct 的概念。

但現在，其實你無需去自己將 construct 建立起來，你可以透過 AWS Construct Library 來去達到你要的服務建置需求，你可以在 [Construct Hub](https://constructs.dev/search?q=&cdk=aws-cdk&cdkver=2&sort=downloadsDesc&offset=0) 找到各種語言建立好的模組，並且你可以將它納入至你的服務做使用。

### Construct Layer 

* Layer 1:
All resource are in `aws-cdk-lib`. 很直接跟 CFN 溝通的 resources，For example, CfnBucket represents the AWS::S3::Bucket AWS CloudFormation resource. 

* Layer 2: AWS constructs offer convenient defaults and reduce the need to know all the details about the AWS resources they represent
  
* Layer 3: Finally, the AWS Construct Library includes L3 constructs, which we call patterns. These constructs are designed to help you complete common tasks in AWS, often involving multiple kinds of resources

### Composition

Composition is the key pattern for defining higher-level abstractions through constructs. A high-level construct can be composed from any number of lower-level constructs. In turn, those could be composed from even lower-level constructs, which eventually are composed from AWS resources.







### App

### CDK Lifecycle

* Construct --> Prepare --> Validate --> Synthesize 


## Prerequisites (在開發前你必須知道的事情)

其實 AWS CDK 不論哪種語言，都是用 Node.js 來把後端打造起來的！！ 可以參考這個[連結](https://github.com/nodejs/release#release-schedule)看一下 Node.js 的開發進度條





## Bootstrapping (很重要)




Bootstrapping - https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html



## 開始你的 CDK 專案



### 關於代碼參數的疑慮

Bucket is the first construct that we've seen, so let's take a closer look. Like all constructs, the Bucket class takes three parameters.

* scope: Tells the bucket that the stack is its parent: it is defined within the scope of the stack. You can define constructs inside of constructs, creating a hierarchy (tree). Here, and in most cases, the scope is this (self in Python), meaning the construct that contains the bucket: the stack.

* Id: The logical ID of the Bucket within your AWS CDK app. This (plus a hash based on the bucket's location within the stack) uniquely identifies the bucket across deployments. This way, the AWS CDK can update it if you change how it's defined in your app. Here, it's "MyFirstBucket." Buckets can also have a name, which is separate from this ID (it's the bucketName property).

* props: A bundle of values that define properties of the bucket. Here we've defined only one property: versioned, which enables versioning for the files in the bucket.




## Typescript 宣告變數規則

* 駝峰式命名 - 如第一個字一定小寫，跟在後麵的詞組開頭一定大寫，ex: removal"P"olicy
* 不用特別背誦參數名稱，通常你輸入時，`aws-lib-cdk` 會自動幫你搜尋
* 什麼叫 [`nullish coalescing`](https://zh.javascript.info/nullish-coalescing-operator) 空值運算？

*空值合並運算符（nullish coalescing operator）的寫法為兩個問號 ??。*

由於它對待 null 和 undefined 的方式類似，所以在本文中我們將使用一個特殊的術語對其進行錶示。為簡潔起見，當一個值既不是 null 也不是 undefined 時，我們將其稱為“已定義的（defined）”。

a ?? b 的結果是：

* 如果 a 是已定義的，則結果為 a，
* 如果 a 不是已定義的，則結果為 b


### Typescript 使用工具

* Microsoft's typescript complier (`tsc`)
* Node.js 以及 Node Package Manager(`npm`)
* 你也可以使用 [`Yarn`](https://yarnpkg.com/) 來管理套件
* AWS Construct 可透過 [NPM repository](https://www.npmjs.com/) 來組件

The CDK includes dependencies for both TypeScript and the CDK Toolkit in the TypeScript project template's `package.json`, so if you want to use this approach, you don't need to make any changes to your project. All you need to do is use slightly different commands for building your app and for issuing cdk commands. 

### Global 與 Local 差別


npx aws-cdk runs the version of the CDK Toolkit installed locally in the current project, if one exists, falling back to the global installation, if any. If no global installation exists, npx downloads a temporary copy of the CDK Toolkit and runs that. You may specify an arbitrary version of the CDK Toolkit using the @ syntax: npx aws-cdk@2.0 --version prints 2.0.0. 



### 如何管理 AWS Construct Library 的模組

首先基本上你在下 `cdk init` 指令時，cdk 就會將所有的 CDK construct 打包在 `aws-cdk-lib` 裡頭了，除非有些更 high-level 還在開發，他的名稱就會像是 `@aws-cdk/SERVICE-NAME-ALPHA` 如果你不確定模組的名稱，你可以到 [npm](https://www.npmjs.com/search?q=%40aws-cdk) 去查看！

> 註意你在用這些模組前必須先用 `npm install @aws-cdk/aws-xxx`


Some services' Construct Library support is in more than one namespace. For example, besides aws-route53, there are three additional Amazon Route 53 namespaces, aws-route53-targets, aws-route53-patterns, and aws-route53resolver.



### 不同語言的模組管理辦法

Managing dependencies - https://docs.aws.amazon.com/cdk/v2/guide/manage-dependencies.html

本網站內容目前是用 typesript 來去打造 App 的，所以若是 typescript 和 javascript 都會將 dependencies 寫在 `package.json` 裏頭。




To update the installed modules, the preceding npm install and yarn upgrade commands can be used. Either command updates the packages in node_modules to the latest versions that satisfy the rules in package.json. **However, they do not update package.json itself, which you might want to do to set a new minimum version**. If you host your package on GitHub, you can configure Dependabot version updates to automatically update package.json. Alternatively, use npm-check-updates.



### Import CDK modules 規則建議


## CDK 編譯的過程 - Building，Synthesizing，Deploying

Node.js 原生是無法直接編譯你 typescript 的語言的，所以 typescript 會先透過 `tsc` 編譯器去處理你的 typescript 轉換成 javascript，然後才會被執行。






