# MCP jq Server Usage Examples

This document provides examples of how to use the MCP jq server tools.

## Tool: `jq_query`

Query JSON data directly using jq syntax.

### Example 1: Extract names from an array
```json
{
  "tool": "jq_query",
  "arguments": {
    "json_data": "[{\"name\": \"Alice\", \"age\": 30}, {\"name\": \"Bob\", \"age\": 25}]",
    "filter": ".[].name"
  }
}
```

### Example 2: Filter by condition
```json
{
  "tool": "jq_query",
  "arguments": {
    "json_data": "[{\"name\": \"Alice\", \"age\": 30}, {\"name\": \"Bob\", \"age\": 25}]",
    "filter": ".[] | select(.age > 27)"
  }
}
```

### Example 3: Raw output (no JSON formatting)
```json
{
  "tool": "jq_query",
  "arguments": {
    "json_data": "[{\"name\": \"Alice\", \"age\": 30}, {\"name\": \"Bob\", \"age\": 25}]",
    "filter": ".[].name",
    "raw_output": true
  }
}
```

## Tool: `jq_query_file`

Query a JSON file using jq syntax.

### Example 1: Query users file for active users
```json
{
  "tool": "jq_query_file",
  "arguments": {
    "file_path": "examples/users.json",
    "filter": ".[] | select(.active == true)"
  }
}
```

### Example 2: Get names and cities
```json
{
  "tool": "jq_query_file",
  "arguments": {
    "file_path": "examples/users.json",
    "filter": ".[] | {name: .name, city: .city}"
  }
}
```

### Example 3: Count users by city
```json
{
  "tool": "jq_query_file",
  "arguments": {
    "file_path": "examples/users.json",
    "filter": "group_by(.city) | map({city: .[0].city, count: length})"
  }
}
```

### Example 4: Complex nested query on company data
```json
{
  "tool": "jq_query_file",
  "arguments": {
    "file_path": "examples/company.json",
    "filter": ".employees[] | .members[] | select(.salary > 100000) | {name: .name, role: .role, salary: .salary}"
  }
}
```

## Tool: `jq_format`

Format and prettify JSON data.

### Example 1: Format compact JSON
```json
{
  "tool": "jq_format",
  "arguments": {
    "json_data": "{\"name\":\"Alice\",\"age\":30,\"skills\":[\"JavaScript\",\"Python\"]}"
  }
}
```

## Advanced jq Queries

Here are some advanced jq query examples you can use:

### Get unique values
```
.[] | .skills[] | unique
```

### Calculate averages
```
map(.age) | add / length
```

### Group and aggregate
```
group_by(.city) | map({city: .[0].city, avg_age: (map(.age) | add / length)})
```

### Transform data structure
```
.[] | {user_info: {name: .name, email: .email}, details: {age: .age, city: .city, active: .active}}
```

### Filter with multiple conditions
```
.[] | select(.age > 25 and .active == true and (.skills | contains(["JavaScript"])))
```

### Sort by field
```
sort_by(.age) | reverse
```

### Get nested values
```
.employees[] | .members[] | select(.department == "Engineering")
```
