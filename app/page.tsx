'use client'

import { useState } from 'react'
import { BookOpen, Code, MessageSquare, CheckCircle, ChevronRight, Award, FileCode, Brain } from 'lucide-react'

const trainingModules = [
  {
    id: 1,
    title: 'SAP CPI Fundamentals',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['What is SAP CPI?', 'Architecture Overview', 'Integration Flows', 'Tenant Management'],
    description: 'Get started with SAP Cloud Platform Integration basics and understand the core concepts.',
    icon: BookOpen,
    completed: false,
    lessons: [
      {
        id: 1,
        title: 'Introduction to SAP CPI',
        content: `SAP Cloud Platform Integration (CPI) is SAP's cloud-based integration platform that enables you to connect cloud and on-premise applications.

**Key Concepts:**

• **Integration Flow (iFlow)**: A visual representation of your integration logic
• **Tenant**: Your CPI workspace in the cloud
• **Adapters**: Connectors for various protocols (HTTP, SFTP, SOAP, etc.)
• **Message Processing**: How data flows through your integration

**Real-world Example:**
Imagine you need to sync customer data from Salesforce to SAP S/4HANA. CPI sits in the middle, receiving data from Salesforce via REST API, transforming it to match S/4HANA's format, and sending it via OData.

**Architecture Layers:**
1. **Design Layer**: Where you build integration flows
2. **Runtime Layer**: Where integrations execute
3. **Monitoring Layer**: Where you track performance and errors`,
        quiz: [
          {
            question: 'What is an Integration Flow (iFlow)?',
            options: [
              'A database table',
              'A visual representation of integration logic',
              'A type of adapter',
              'A monitoring tool'
            ],
            correct: 1
          }
        ]
      },
      {
        id: 2,
        title: 'CPI Architecture Deep Dive',
        content: `Let's understand how SAP CPI is architected and why it matters for your daily work.

**Core Components:**

• **Design Time**: Web-based UI for creating iFlows
• **Runtime**: Cloud Foundry environment executing your integrations
• **Neo Environment vs Cloud Foundry**: Know the difference!

**Tenant Types:**
- **Development Tenant**: For building and testing
- **Test/QA Tenant**: For user acceptance testing
- **Production Tenant**: For live integrations

**Message Processing Flow:**
1. Message arrives at sender adapter
2. Content is read and validated
3. Transformations applied (mapping, scripts)
4. Message sent via receiver adapter
5. Status logged in Message Processing Logs

**Pro Tip (from my 2 years experience):**
Always design your iFlows with error handling from day one. Use Exception Subprocess to catch errors and send alerts. I learned this the hard way when a production flow failed silently for 3 days!`,
        quiz: [
          {
            question: 'Which component executes integration flows?',
            options: [
              'Design Time',
              'Runtime',
              'Monitoring Dashboard',
              'Adapter Framework'
            ],
            correct: 1
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Building Integration Flows',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['iFlow Design', 'Adapters', 'Message Mapping', 'Content Modifiers'],
    description: 'Learn to build robust integration flows with proper error handling and transformations.',
    icon: Code,
    completed: false,
    lessons: [
      {
        id: 1,
        title: 'Creating Your First iFlow',
        content: `Let's build a real integration flow step by step.

**Scenario:** Receive customer orders via HTTP and send to an SFTP server.

**Step-by-Step Process:**

1. **Create Integration Package**
   - Navigate to Design → Integrations
   - Click "Create" → Name it "Customer_Order_Processing"

2. **Add Integration Flow**
   - Click "Create" → "Integration Flow"
   - Name: "HTTP_to_SFTP_Order"

3. **Configure Sender**
   - Drag "Sender" shape from palette
   - Add "HTTP" adapter
   - Set Address: /orders
   - Method: POST

4. **Add Transformations**
   - Add "Content Modifier" to add headers
   - Set property: orderDate = \${date:now:yyyy-MM-dd}

5. **Configure Receiver**
   - Add "Receiver" shape
   - Add "SFTP" adapter
   - Directory: /orders/incoming
   - File Name: order_\$\{date:now:yyyyMMdd_HHmmss\}.xml

6. **Deploy and Test**
   - Click "Deploy"
   - Wait for "Started" status
   - Test with Postman

**Common Mistakes I Made:**
- Forgetting to deploy after changes (always check deployment status!)
- Not setting proper file names (led to overwritten files)
- Skipping error handling (learned this in production!)`,
        quiz: [
          {
            question: 'What adapter receives HTTP requests in CPI?',
            options: [
              'SOAP Adapter',
              'HTTP Adapter',
              'ProcessDirect Adapter',
              'Mail Adapter'
            ],
            correct: 1
          }
        ]
      },
      {
        id: 2,
        title: 'Adapters Deep Dive',
        content: `Understanding adapters is crucial. Let me share what I use daily.

**Most Common Adapters:**

**1. HTTP/HTTPS Adapter**
- Use Case: REST APIs, webhooks
- Configuration: URL, method, authentication
- Pro Tip: Use "Request Reply" for synchronous calls

**2. SFTP Adapter**
- Use Case: File transfers
- Configuration: Host, directory, credentials
- Pro Tip: Use polling for scheduled file pickup

**3. SOAP Adapter**
- Use Case: Legacy SOAP services
- Configuration: WSDL, operation
- Pro Tip: Import WSDL directly, don't build manually

**4. OData Adapter**
- Use Case: SAP S/4HANA, SuccessFactors
- Configuration: Service URL, entity
- Pro Tip: Use $batch for bulk operations

**5. ProcessDirect Adapter**
- Use Case: Connecting multiple iFlows
- Configuration: Address (must match)
- Pro Tip: Great for modular design

**Real Example from My Project:**
We integrated Salesforce (REST) → CPI → SAP ECC (IDoc). Chain was:
HTTP Adapter → Groovy Script → XI Adapter

**Authentication Types:**
- Basic Auth (simple, less secure)
- OAuth 2.0 (modern, recommended)
- Client Certificate (highest security)`,
        quiz: [
          {
            question: 'Which adapter connects multiple iFlows internally?',
            options: [
              'HTTP Adapter',
              'SFTP Adapter',
              'ProcessDirect Adapter',
              'Mail Adapter'
            ],
            correct: 2
          }
        ]
      },
      {
        id: 3,
        title: 'Message Mapping Essentials',
        content: `Mapping transforms data from source to target format. This is where you spend most of your time!

**Mapping Types:**

**1. Message Mapping (Graphical)**
- Drag-and-drop interface
- Functions: concat, substring, dateTransform
- Best for: Simple field mappings

**2. XSLT Mapping**
- XML-based transformations
- More powerful than graphical
- Best for: Complex XML transformations

**3. Groovy Script**
- Full programming capability
- Access to Java libraries
- Best for: Complex logic, API calls

**Practical Example - JSON to XML:**

Input (JSON):
\`\`\`json
{
  "customerId": "C123",
  "orderDate": "2024-01-15",
  "items": [
    {"product": "Widget", "qty": 5}
  ]
}
\`\`\`

Groovy Script:
\`\`\`groovy
import com.sap.gateway.ip.core.customdev.util.Message
import groovy.json.JsonSlurper

def Message processData(Message message) {
    def body = message.getBody(String)
    def json = new JsonSlurper().parseText(body)

    def xml = """<?xml version="1.0"?>
<Order>
    <CustomerID>\${json.customerId}</CustomerID>
    <Date>\${json.orderDate}</Date>
    <Items>
        \${json.items.collect {
            "<Item><Product>\${it.product}</Product><Quantity>\${it.qty}</Quantity></Item>"
        }.join('')}
    </Items>
</Order>"""

    message.setBody(xml)
    return message
}
\`\`\`

**My Mapping Tips:**
1. Always test with real data samples
2. Handle null values gracefully
3. Log inputs/outputs during development
4. Use Value Mapping for code translations`,
        quiz: [
          {
            question: 'Which mapping type offers the most flexibility?',
            options: [
              'Graphical Mapping',
              'XSLT Mapping',
              'Groovy Script',
              'Value Mapping'
            ],
            correct: 2
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Advanced Patterns',
    level: 'Intermediate',
    duration: '4 hours',
    topics: ['Error Handling', 'Message Routing', 'Splitter/Aggregator', 'Security'],
    description: 'Master advanced integration patterns used in enterprise scenarios.',
    icon: Brain,
    completed: false,
    lessons: [
      {
        id: 1,
        title: 'Error Handling Strategies',
        content: `Error handling separates junior from experienced developers. Here's what I learned.

**Exception Subprocess Pattern:**

Every production iFlow should have:
1. Main process flow
2. Exception subprocess to catch errors
3. Error notification mechanism

**Implementation Steps:**

1. **Add Exception Subprocess**
   - Right-click canvas → "Exception Subprocess"
   - This catches ALL errors in main flow

2. **Capture Error Details**
   - Add Content Modifier
   - Create properties:
     * errorMessage = \${exception.message}
     * errorTime = \${date:now}
     * originalPayload = \${in.body}

3. **Send Error Notification**
   - Add Mail Adapter or HTTP call to ticketing system
   - Include error details in body

**Real Example:**
\`\`\`
Main Flow:
[HTTP Sender] → [Transform] → [SFTP Receiver]
                    ↓ (on error)
              [Exception Subprocess]
                    ↓
              [Log Error] → [Send Email] → [Store in Error Queue]
\`\`\`

**Retry Mechanisms:**

Configure in Sender Adapter:
- Max Retries: 3
- Retry Interval: 5 minutes
- Exponential Backoff: Enabled

**Error Message Template I Use:**
\`\`\`
Subject: CPI Error - \${property.iflowName}
Body:
Time: \${property.errorTime}
Message: \${property.errorMessage}
Payload: \${property.originalPayload}
Trace: \${exception.stacktrace}
\`\`\`

**Pro Tip:**
Always store failed messages in a separate iFlow using ProcessDirect. This allows you to replay them after fixing issues!`,
        quiz: [
          {
            question: 'What catches all errors in an iFlow?',
            options: [
              'Error Handler',
              'Exception Subprocess',
              'Try-Catch Block',
              'Error Adapter'
            ],
            correct: 1
          }
        ]
      },
      {
        id: 2,
        title: 'Content-Based Routing',
        content: `Routing messages to different receivers based on content is super common.

**Router Element:**

Use when you need to send messages to different systems based on conditions.

**Example Scenario:**
Route orders to different fulfillment centers based on region.

**Configuration:**

1. **Add Router**
   - Drag "Router" shape after sender
   - Multiple output routes

2. **Define Routes:**

Route 1 - East Region:
- Condition: \${xpath.evaluate('/Order/Region', body)} = 'EAST'
- Receiver: East_FC_System

Route 2 - West Region:
- Condition: \${xpath.evaluate('/Order/Region', body)} = 'WEST'
- Receiver: West_FC_System

Route 3 - Default:
- Condition: (leave empty for default)
- Receiver: Central_FC_System

**XPath for XML:**
\`\`\`xpath
/Order/Region
/Order/Items/Item[1]/Product
count(/Order/Items/Item) > 5
\`\`\`

**JSONPath for JSON:**
\`\`\`
$.order.region
$.order.items[0].product
\`\`\`

**Multicast Pattern:**

Send same message to MULTIPLE receivers simultaneously.

1. Add "Multicast" shape
2. Connect to multiple receivers
3. All receive the same payload

**Real Project Example:**
I built a customer creation flow that:
- Sent to SAP ECC (primary)
- Sent to Salesforce (CRM)
- Sent to Data Warehouse (analytics)
- Sent to Notification Service (email)

All triggered by one HTTP call!

**Performance Tip:**
Use Multicast only when needed. Sequential processing is easier to debug.`,
        quiz: [
          {
            question: 'Which element routes to ONE receiver based on conditions?',
            options: [
              'Multicast',
              'Router',
              'Splitter',
              'Aggregator'
            ],
            correct: 1
          }
        ]
      },
      {
        id: 3,
        title: 'Splitter and Aggregator Patterns',
        content: `Handle bulk messages by splitting and aggregating. Critical for batch processing!

**Splitter Types:**

**1. General Splitter**
- Splits XML/JSON arrays
- Each element becomes separate message
- Configuration: XPath or JSONPath

**2. Iterating Splitter**
- Processes each element sequentially
- Useful for ordered processing
- Maintains sequence

**Example - Process Bulk Orders:**

Input:
\`\`\`xml
<Orders>
  <Order><ID>1</ID><Amount>100</Amount></Order>
  <Order><ID>2</ID><Amount>200</Amount></Order>
  <Order><ID>3</ID><Amount>300</Amount></Order>
</Orders>
\`\`\`

Configuration:
- Expression Type: XPath
- XPath: /Orders/Order
- Grouping: 1 (process one at a time)

Result: 3 separate messages, each with one Order

**Aggregator Pattern:**

Combines multiple messages back into one.

**Use Case:**
You split 100 orders, process each, then aggregate responses.

**Configuration:**
- Aggregation Algorithm: Combine
- Completion Condition: After all messages
- Timeout: 5 minutes

**Real Implementation I Built:**

\`\`\`
[HTTP Receiver - Bulk Orders]
         ↓
[General Splitter - Split by Order]
         ↓
[Transform Each Order]
         ↓
[Call External API for Each]
         ↓
[Gather Responses - Aggregator]
         ↓
[Send Combined Response]
\`\`\`

**Critical Settings:**

Splitter:
- Stop on Exception: false (continue on errors)
- Parallel Processing: true (faster)
- Timeout: 600000 ms

Aggregator:
- Incoming Format: XML
- Aggregation Strategy: Concatenate
- Completion Timeout: 10 minutes

**Lessons Learned:**
1. Always set timeouts (I had one run for hours!)
2. Consider memory with large batches
3. Use Iterating for ordered processing
4. Test with production-like volumes`,
        quiz: [
          {
            question: 'What combines multiple messages into one?',
            options: [
              'Splitter',
              'Router',
              'Aggregator',
              'Multicast'
            ],
            correct: 2
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Monitoring & Troubleshooting',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Message Monitoring', 'Trace Logs', 'Performance Tuning', 'Common Issues'],
    description: 'Learn to monitor integrations and quickly troubleshoot production issues.',
    icon: MessageSquare,
    completed: false,
    lessons: [
      {
        id: 1,
        title: 'Message Monitoring Dashboard',
        content: `This is where you'll spend a lot of time in production. Let me show you the essentials.

**Accessing Monitoring:**
Navigate to: Monitor → Integrations → Monitor Message Processing

**Message States:**

✅ **Completed**: Success, no action needed
⏸️ **Retry**: Temporary failure, will retry
❌ **Failed**: Permanent failure, needs investigation
🔄 **Processing**: Currently running

**Key Columns to Watch:**

1. **Status**: Overall outcome
2. **Integration Flow**: Which iFlow
3. **Start Time**: When processing began
4. **Duration**: Performance indicator
5. **Sender**: Source system
6. **Receiver**: Target system

**Filtering Like a Pro:**

I use these filters daily:
\`\`\`
Status: Failed
Time Range: Last 1 hour
Integration Flow: *Order*
\`\`\`

**My Morning Routine:**
1. Check Failed messages (last 24h)
2. Review Retry messages
3. Check slow-running flows (duration > 30s)
4. Verify critical integrations ran

**Message Details:**

Click any message to see:
- **Properties Tab**: Headers, properties
- **Payload Tab**: Actual data (sanitize sensitive info!)
- **Trace**: Step-by-step execution
- **Attachments**: Files processed

**Pro Tip:**
Set up email alerts for Failed messages. I use:
- Alert me immediately for critical flows
- Digest email (hourly) for non-critical

**Common Failure Patterns:**

❌ Connection timeout → Check receiver system
❌ Authentication failed → Verify credentials
❌ Mapping error → Check input data format
❌ File not found → Verify SFTP path`,
        quiz: [
          {
            question: 'Which message state requires immediate investigation?',
            options: [
              'Completed',
              'Processing',
              'Failed',
              'Scheduled'
            ],
            correct: 2
          }
        ]
      },
      {
        id: 2,
        title: 'Trace Logs and Debugging',
        content: `Trace logs are your best friend when debugging. Here's how I use them.

**Enabling Trace:**

In iFlow:
1. Open Integration Flow
2. Add "Trace" step (looks like a bug icon)
3. Set Trace Level: Info or Debug
4. Deploy

**Log Levels:**

📝 **Info**: General flow of application
🐛 **Debug**: Detailed diagnostic info
⚠️ **Warning**: Potentially harmful situations
❌ **Error**: Error events

**Groovy Logging:**

\`\`\`groovy
import com.sap.gateway.ip.core.customdev.util.Message
import java.util.HashMap

def Message processData(Message message) {
    // Get logger
    def messageLog = messageLogFactory.getMessageLog(message)

    // Log at different levels
    messageLog.setLogLevel('INFO')
    messageLog.addCustomHeaderProperty('StartTime', new Date().toString())

    def body = message.getBody(String)
    messageLog.addAttachmentAsString('Input', body, 'text/plain')

    // Your processing logic
    // ...

    messageLog.addAttachmentAsString('Output', transformedBody, 'text/plain')

    return message
}
\`\`\`

**Accessing Trace Logs:**

1. Go to Message Monitoring
2. Click on message
3. Click "Trace" tab
4. Expand each step

**What I Look For:**

✓ Input payload at entry point
✓ Output after each transformation
✓ Headers and properties at each step
✓ Timing of each step (performance)

**Real Debugging Session:**

**Problem**: Orders not reaching SAP
**Investigation**:
1. Check message status: Completed (huh?)
2. Check trace: Splitter created 0 messages
3. Check input: Wrong XML namespace
4. Fix: Update XPath to handle namespace

**Debugging Checklist:**

□ Verify input format matches expectation
□ Check all adapter configurations
□ Verify credentials are current
□ Check receiver system is accessible
□ Review recent changes to iFlow
□ Test with simple payload first

**Performance Debugging:**

Slow iFlow? Check:
1. Trace timestamps between steps
2. Look for external API calls (biggest bottleneck)
3. Check if splitter processing 1000s of items
4. Review database queries

**Best Practice:**
Remove or disable trace logging in production (performance impact). Enable only when debugging.`,
        quiz: [
          {
            question: 'What should you check first when debugging?',
            options: [
              'Receiver system',
              'Input payload',
              'Credentials',
              'Network settings'
            ],
            correct: 1
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Real-World Scenarios',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['End-to-End Projects', 'Best Practices', 'Common Pitfalls', 'Interview Prep'],
    description: 'Apply your knowledge to real-world scenarios based on actual project experience.',
    icon: Award,
    completed: false,
    lessons: [
      {
        id: 1,
        title: 'Project: Salesforce to SAP S/4HANA',
        content: `Let me walk you through a real project I completed. This is interview-worthy material.

**Business Requirement:**

Sync customer master data from Salesforce to SAP S/4HANA in real-time when customers are created or updated in Salesforce.

**Technical Design:**

**Architecture:**
\`\`\`
Salesforce (Webhook)
    → CPI (HTTP Receiver)
    → Transform (JSON to XML/IDoc)
    → SAP S/4HANA (IDoc Adapter)
    → Response back to Salesforce
\`\`\`

**Implementation Steps:**

**1. Salesforce Configuration:**
- Created Outbound Message on Account object
- Trigger: After Insert, After Update
- Endpoint: CPI HTTP address

**2. CPI Integration Flow:**

\`\`\`
Components:
- HTTP Sender (OAuth 2.0 authenticated)
- Content Modifier (extract Salesforce fields)
- Groovy Script (JSON to IDoc format)
- IDoc Adapter (send to S/4HANA)
- Exception Subprocess (error handling)
- ProcessDirect (send response to Salesforce)
\`\`\`

**3. Transformation Logic (Groovy):**

\`\`\`groovy
import com.sap.gateway.ip.core.customdev.util.Message
import groovy.json.JsonSlurper
import groovy.xml.MarkupBuilder

def Message processData(Message message) {
    def body = message.getBody(String)
    def json = new JsonSlurper().parseText(body)

    def writer = new StringWriter()
    def xml = new MarkupBuilder(writer)

    xml.DEBMAS06 {
        IDOC(BEGIN: "1") {
            EDI_DC40(SEGMENT: "1") {
                IDOCTYP('DEBMAS06')
                MESTYP('DEBMAS')
            }
            E1KNA1M(SEGMENT: "1") {
                KUNNR(json.AccountNumber)
                NAME1(json.Name)
                STRAS(json.BillingStreet)
                ORT01(json.BillingCity)
                PSTLZ(json.BillingPostalCode)
                LAND1(json.BillingCountry)
                TELF1(json.Phone)
                SMTP_ADDR(json.Email)
            }
        }
    }

    message.setBody(writer.toString())
    return message
}
\`\`\`

**4. Error Handling:**

- Catch transformation errors → Log and notify
- Catch S/4HANA connection errors → Retry 3 times
- Store failed messages in error queue
- Daily error report email

**5. Testing Strategy:**

✓ Unit test: Single customer record
✓ Volume test: 100 customers in 5 minutes
✓ Error test: Invalid data, system down
✓ Performance test: Response time < 3 seconds

**Challenges I Faced:**

**Challenge 1**: IDoc field length mismatches
**Solution**: Added validation and truncation in Groovy script

**Challenge 2**: Duplicate customer creation
**Solution**: Added deduplication logic checking S/4HANA first

**Challenge 3**: OAuth token expiration
**Solution**: Configured automatic token refresh in CPI

**Metrics After Go-Live:**

- 500+ customers synced daily
- 99.8% success rate
- Average processing time: 1.2 seconds
- Zero data loss incidents

**Interview Questions I Got:**

Q: "How did you handle Salesforce rate limits?"
A: Implemented batch processing and throttling in CPI

Q: "What if S/4HANA is down?"
A: Retry logic + store in queue + alert operations team

Q: "How do you ensure data consistency?"
A: Transaction handling + validation + reconciliation reports`,
        quiz: [
          {
            question: 'What format does SAP S/4HANA typically receive?',
            options: [
              'JSON',
              'IDoc',
              'CSV',
              'Plain Text'
            ],
            correct: 1
          }
        ]
      },
      {
        id: 2,
        title: 'Best Practices from Experience',
        content: `After 2 years, here's what I wish I knew from day one.

**Design Principles:**

**1. Modular Design**
Break complex flows into smaller iFlows using ProcessDirect.

❌ Bad: One giant iFlow with 50 steps
✅ Good: Main iFlow + 3 sub-flows for specific functions

**2. Naming Conventions**

My standard:
\`\`\`
Package: BU_Domain_Function
  Example: Sales_Order_Processing

iFlow: Source_To_Target_Object
  Example: SFDC_To_S4_Customer

Endpoints: /domain/version/resource
  Example: /sales/v1/orders
\`\`\`

**3. Configuration Management**

Use Externalized Parameters for:
- URLs (different per environment)
- Credentials
- File paths
- Business rules (thresholds, limits)

**4. Error Handling Standards**

Every production iFlow MUST have:
- Exception Subprocess
- Error logging
- Alert mechanism
- Failed message storage

**5. Documentation**

Maintain:
- Integration design document
- Data mapping specifications
- Deployment guide
- Runbook for operations team

**Security Best Practices:**

🔒 Never hardcode credentials
🔒 Use OAuth over Basic Auth
🔒 Rotate credentials every 90 days
🔒 Encrypt sensitive data
🔒 Use HTTPS, never HTTP
🔒 Implement IP whitelisting
🔒 Log access attempts

**Performance Best Practices:**

⚡ Avoid large payload transformations
⚡ Use pagination for large datasets
⚡ Implement caching where possible
⚡ Use async processing for non-critical
⚡ Optimize XPath expressions
⚡ Limit logging in production

**Development Workflow:**

\`\`\`
1. Design on paper/whiteboard first
2. Build in Dev tenant
3. Unit test with sample data
4. Peer review
5. Promote to Test tenant
6. Integration testing
7. UAT (User Acceptance Testing)
8. Promote to Production
9. Smoke test in production
10. Monitor for 24 hours
\`\`\`

**Version Control Strategy:**

- Export iFlow after each major change
- Store in Git repository
- Tag releases
- Document changes in commit messages

**Monitoring Strategy:**

Daily:
- Check failed messages
- Review error trends
- Verify critical flows executed

Weekly:
- Performance analysis
- Capacity planning
- Review error patterns

Monthly:
- Security review
- Credential rotation
- Archive old messages
- Performance tuning

**Common Pitfalls to Avoid:**

❌ Deploying without testing
❌ No error handling
❌ Hardcoded values
❌ Ignoring monitoring
❌ Poor naming conventions
❌ No documentation
❌ Testing only happy path
❌ Not considering scale
❌ Skipping code reviews
❌ No rollback plan

**Pro Tips:**

💡 Keep a personal runbook of solutions to common errors
💡 Build reusable templates for common patterns
💡 Automate repetitive tasks with scripts
💡 Join SAP Community and ask questions
💡 Stay updated with monthly CPI releases
💡 Practice building flows even for learning`,
        quiz: [
          {
            question: 'What should EVERY production iFlow have?',
            options: [
              'Beautiful design',
              'Exception Subprocess',
              'Multiple routers',
              'Splitter'
            ],
            correct: 1
          }
        ]
      },
      {
        id: 3,
        title: 'Interview Preparation',
        content: `Based on interviews I've done, here's what you need to know.

**Technical Questions:**

**Q: Explain the difference between Cloud Foundry and Neo environment.**
A: Cloud Foundry is the modern, scalable platform with better performance and features. Neo is the legacy environment being phased out. CF uses Docker containers, Neo uses VMs.

**Q: How do you handle large file processing?**
A:
1. Use streaming (don't load entire file in memory)
2. Split into chunks if needed
3. Process asynchronously
4. Use SFTP adapter for large files
5. Consider external storage (S3) for very large files

**Q: Explain your approach to security in CPI.**
A:
- Use OAuth 2.0 for authentication
- Externalize credentials
- Encrypt sensitive data
- Use secure protocols (HTTPS, SFTP)
- Implement IP whitelisting
- Regular credential rotation
- Audit logs enabled

**Q: How do you optimize performance?**
A:
- Minimize payload transformations
- Use parallel processing with multicast
- Implement caching
- Optimize XPath/JSONPath expressions
- Use pagination for large datasets
- Remove unnecessary logging in production

**Q: Describe your deployment process.**
A:
- Build and test in Dev
- Export integration package
- Import to Test environment
- Perform integration testing
- Get stakeholder approval
- Deploy to Production during maintenance window
- Smoke test
- Monitor for 24-48 hours

**Scenario-Based Questions:**

**Q: A critical integration is failing in production. Walk me through your troubleshooting process.**
A:
1. Check message monitoring - identify error
2. Review trace logs - find failure point
3. Check payload - validate format
4. Verify receiver system - network/availability
5. Check recent changes - rollback if needed
6. Test with sample data in Dev
7. Fix and redeploy
8. Reprocess failed messages
9. Document root cause

**Q: You need to sync 1 million records from external system to SAP. How do you approach this?**
A:
1. Design batch processing with splitter
2. Implement pagination (1000 records per call)
3. Use asynchronous processing
4. Add throttling to avoid overwhelming SAP
5. Implement checkpointing for restart
6. Error handling for partial failures
7. Reconciliation report at end
8. Schedule during off-peak hours

**Q: How do you handle message deduplication?**
A:
- Use JMS queue with message ID
- Implement custom duplicate check in Groovy
- Store processed message IDs in database
- Use CPI Data Store with expiration
- Implement idempotent receiver pattern

**Behavioral Questions:**

**Q: Tell me about a challenging integration project.**
Prepare STAR method answer:
- Situation: Describe project context
- Task: Your responsibility
- Action: What you did
- Result: Outcome with metrics

**Q: How do you stay current with CPI updates?**
- SAP Community blogs
- Monthly release notes
- Hands-on experimentation
- Online courses
- Networking with other CPI developers

**Technical Skills to Highlight:**

✓ CPI design and development
✓ Groovy scripting
✓ XSLT and message mapping
✓ Integration patterns (splitter, router, etc.)
✓ Adapter configuration (HTTP, SFTP, SOAP, OData)
✓ Security implementation
✓ Performance optimization
✓ Monitoring and troubleshooting
✓ Project experience with timelines and metrics

**What Interviewers Look For:**

1. Hands-on experience (talk about real projects)
2. Problem-solving approach (structured thinking)
3. Best practices knowledge
4. Security awareness
5. Performance considerations
6. Communication skills
7. Learning mindset

**My Interview Success Formula:**

Before interview:
- Review recent projects
- Practice explaining technical concepts simply
- Prepare questions about their integration landscape
- Have examples ready for common scenarios

During interview:
- Ask clarifying questions
- Think out loud
- Mention real project examples
- Show problem-solving process
- Be honest about what you don't know

**Red Flags to Avoid:**

❌ Saying "I don't know" without showing willingness to learn
❌ Not asking questions about requirements
❌ Only knowing theory, no practical experience
❌ Bad-mouthing previous employers
❌ Not considering security or error handling
❌ Overcomplicating simple solutions

**Sample Project to Discuss:**

"I built an integration connecting Salesforce to SAP S/4HANA for real-time customer sync. The flow received JSON from Salesforce webhooks, transformed to IDoc format using Groovy, and sent to S/4HANA. I implemented retry logic, error notifications, and duplicate checking. We processed 500+ customers daily with 99.8% success rate and average 1.2s response time. The biggest challenge was handling IDoc field length mismatches, which I solved by adding validation in the transformation script."`,
        quiz: [
          {
            question: 'What method is best for behavioral interview questions?',
            options: [
              'SOLID',
              'STAR',
              'ACID',
              'REST'
            ],
            correct: 1
          }
        ]
      }
    ]
  }
]

export default function Home() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())

  const currentModule = selectedModule !== null ? trainingModules[selectedModule] : null
  const currentLesson = currentModule && selectedLesson !== null ? currentModule.lessons[selectedLesson] : null

  const handleQuizSubmit = () => {
    setShowResults(true)
    if (currentModule && currentLesson) {
      const lessonKey = `${currentModule.id}-${currentLesson.id}`
      setCompletedLessons(prev => new Set([...prev, lessonKey]))
    }
  }

  const handleNextLesson = () => {
    if (currentModule && selectedLesson !== null) {
      if (selectedLesson < currentModule.lessons.length - 1) {
        setSelectedLesson(selectedLesson + 1)
        setQuizAnswers({})
        setShowResults(false)
      } else {
        setSelectedModule(null)
        setSelectedLesson(null)
        setQuizAnswers({})
        setShowResults(false)
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileCode className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SAP CPI Training Academy</h1>
              <p className="text-gray-600 mt-1">Your path to becoming a 2-year experienced CPI developer</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedModule && (
          <div>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Welcome to Your SAP CPI Journey! 👋</h2>
              <p className="text-lg mb-4">
                I'm your virtual mentor with 2 years of hands-on SAP CPI experience. I'll guide you through everything from basics to advanced patterns, sharing real project experiences and lessons learned.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm">Training Modules</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">14+</div>
                  <div className="text-sm">Lessons</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">Real</div>
                  <div className="text-sm">Project Experience</div>
                </div>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {trainingModules.map((module, index) => {
                const Icon = module.icon
                const completedCount = module.lessons.filter(lesson =>
                  completedLessons.has(`${module.id}-${lesson.id}`)
                ).length
                const progress = (completedCount / module.lessons.length) * 100

                return (
                  <div
                    key={module.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border-2 border-transparent hover:border-blue-500"
                    onClick={() => setSelectedModule(index)}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="text-white" size={28} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                              module.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                              module.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {module.level}
                            </span>
                            <span className="text-xs text-gray-500">{module.duration}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {module.description}
                      </p>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{completedCount}/{module.lessons.length} lessons</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.topics.slice(0, 3).map((topic, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {topic}
                          </span>
                        ))}
                        {module.topics.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            +{module.topics.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {module.lessons.length} lessons
                        </div>
                        <ChevronRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {selectedModule !== null && !selectedLesson && currentModule && (
          <div>
            <button
              onClick={() => setSelectedModule(null)}
              className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
            >
              ← Back to Modules
            </button>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  {currentModule.icon && <currentModule.icon className="text-white" size={32} />}
                </div>
                <div className="flex-1">
                  <span className={`text-xs font-semibold px-3 py-1 rounded ${
                    currentModule.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    currentModule.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentModule.level}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-2">{currentModule.title}</h2>
                  <p className="text-gray-600">{currentModule.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Duration</div>
                  <div className="text-xl font-bold text-gray-900">{currentModule.duration}</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Topics Covered</div>
                  <div className="text-xl font-bold text-gray-900">{currentModule.topics.length} topics</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Lessons</h3>
              <div className="space-y-3">
                {currentModule.lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.has(`${currentModule.id}-${lesson.id}`)
                  return (
                    <div
                      key={lesson.id}
                      className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-all cursor-pointer hover:shadow-md"
                      onClick={() => setSelectedLesson(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                            <p className="text-sm text-gray-600">{lesson.quiz.length} knowledge checks</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {isCompleted && (
                            <CheckCircle className="text-green-600" size={20} />
                          )}
                          <ChevronRight className="text-blue-600" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {currentLesson && currentModule && (
          <div>
            <button
              onClick={() => {
                setSelectedLesson(null)
                setQuizAnswers({})
                setShowResults(false)
              }}
              className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2 font-medium"
            >
              ← Back to {currentModule.title}
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Lesson Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded">
                    Lesson {selectedLesson! + 1} of {currentModule.lessons.length}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">{currentLesson.title}</h2>
              </div>

              {/* Lesson Content */}
              <div className="p-8">
                <div className="prose max-w-none mb-8">
                  {currentLesson.content.split('\n\n').map((paragraph, i) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return <h3 key={i} className="text-xl font-bold text-gray-900 mt-6 mb-3">{paragraph.slice(2, -2)}</h3>
                    }
                    if (paragraph.startsWith('•')) {
                      const items = paragraph.split('\n')
                      return (
                        <ul key={i} className="list-disc pl-6 space-y-2 mb-4">
                          {items.map((item, j) => (
                            <li key={j} className="text-gray-700">{item.replace('• ', '')}</li>
                          ))}
                        </ul>
                      )
                    }
                    if (paragraph.startsWith('```')) {
                      const code = paragraph.split('```')[1]
                      return (
                        <pre key={i} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                          <code>{code}</code>
                        </pre>
                      )
                    }
                    if (paragraph.startsWith('✓') || paragraph.startsWith('❌') || paragraph.startsWith('⚡') || paragraph.startsWith('🔒') || paragraph.startsWith('💡') || paragraph.startsWith('□')) {
                      return <p key={i} className="text-gray-800 mb-3 pl-6">{paragraph}</p>
                    }
                    return <p key={i} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
                  })}
                </div>

                {/* Quiz Section */}
                <div className="border-t-2 border-gray-200 pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Knowledge Check</h3>
                  {currentLesson.quiz.map((q, qIndex) => {
                    const isCorrect = quizAnswers[qIndex] === q.correct
                    return (
                      <div key={qIndex} className="mb-6 bg-gray-50 rounded-xl p-6">
                        <p className="font-semibold text-gray-900 mb-4">{q.question}</p>
                        <div className="space-y-3">
                          {q.options.map((option, oIndex) => (
                            <label
                              key={oIndex}
                              className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                                showResults
                                  ? oIndex === q.correct
                                    ? 'bg-green-100 border-2 border-green-500'
                                    : quizAnswers[qIndex] === oIndex
                                    ? 'bg-red-100 border-2 border-red-500'
                                    : 'bg-white border-2 border-gray-200'
                                  : quizAnswers[qIndex] === oIndex
                                  ? 'bg-blue-100 border-2 border-blue-500'
                                  : 'bg-white border-2 border-gray-200 hover:border-blue-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${qIndex}`}
                                checked={quizAnswers[qIndex] === oIndex}
                                onChange={() => setQuizAnswers({ ...quizAnswers, [qIndex]: oIndex })}
                                disabled={showResults}
                                className="w-5 h-5"
                              />
                              <span className="text-gray-900">{option}</span>
                              {showResults && oIndex === q.correct && (
                                <CheckCircle className="ml-auto text-green-600" size={20} />
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    )
                  })}

                  <div className="flex gap-4">
                    {!showResults ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                        className="flex-1 bg-blue-600 text-white py-4 px-8 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Submit Answers
                      </button>
                    ) : (
                      <button
                        onClick={handleNextLesson}
                        className="flex-1 bg-green-600 text-white py-4 px-8 rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        {selectedLesson! < currentModule.lessons.length - 1 ? 'Next Lesson' : 'Complete Module'}
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>

                  {showResults && (
                    <div className="mt-6 p-6 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="text-blue-600" size={24} />
                        <h4 className="text-lg font-bold text-gray-900">Great work!</h4>
                      </div>
                      <p className="text-gray-700">
                        You've completed this lesson. {selectedLesson! < currentModule.lessons.length - 1 ? 'Ready for the next one?' : 'Module complete!'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
