# Pagination Standard — DevSparks DeployCheck API

DevSparks DeployCheck uses standard cursor-based pagination for all list-oriented API endpoints (`GET /api/v1/audits`, `GET /api/v1/deployments`, `GET /api/v1/projects`).

---

## 1. Query Parameters

All collection endpoints accept the following standardized query parameters:

| Parameter | Type | Default | Maximum | Description |
| :--- | :--- | :--- | :--- | :--- |
| `limit` | integer | `20` | `100` | The number of records to return per page. |
| `cursor` | string (opaque) | `null` | — | Base64-encoded cursor pointer returned from the previous page's `meta.nextCursor`. |
| `direction` | string | `desc` | — | Sort order by creation timestamp (`desc` or `asc`). Default is `desc` (newest first). |

---

## 2. Response Format

Paginated responses follow standard JSON wrapping:

```json
{
  "data": [
    {
      "id": "audit_01j7xyz...",
      "projectId": "proj_01j6abc...",
      "status": "SUCCESS",
      "createdAt": "2026-11-03T18:00:00.000Z"
    }
  ],
  "meta": {
    "limit": 20,
    "hasMore": true,
    "nextCursor": "ZXlKaGJHY2lPaUpTVXpVe...",
    "totalCount": 142
  }
}
```

---

## 3. Traversal Example

### First Request (Initial Page)
```http
GET /api/v1/audits?limit=20 HTTP/1.1
Host: api.deploycheck.devsparks.io
Authorization: Bearer <DEPLOYCHECK_API_KEY>
```

### Subsequent Request (Next Page)
```http
GET /api/v1/audits?limit=20&cursor=ZXlKaGJHY2lPaUpTVXpVe... HTTP/1.1
Host: api.deploycheck.devsparks.io
Authorization: Bearer <DEPLOYCHECK_API_KEY>
```

When `meta.hasMore` is `false`, the client has reached the end of the collection and `nextCursor` will be `null`.

