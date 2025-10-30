# Troubleshooting Guide

## Common Issues and Solutions

### 504 Gateway Timeout Error

**Error Message:**
```
Error: API Error: 504 Gateway Time-out
```

**Cause:** The Open Food Facts API is responding slowly or is temporarily overloaded.

**Solutions:**

1. **Try a Different Search Term**
   - Use more specific search terms (e.g., "coca cola" instead of "drink")
   - Try popular/common food items first

2. **Wait and Retry**
   - The API may be experiencing high traffic
   - Wait 10-30 seconds before trying again
   - The backend now automatically retries failed requests up to 3 times

3. **Check Your Internet Connection**
   - Ensure you have a stable internet connection
   - Try accessing other websites to verify connectivity

4. **Use Cached Results**
   - The backend caches successful searches for 5 minutes
   - Searching for the same term again will use cached data

### What We've Improved

The backend now includes:

✅ **Automatic Retries**: Up to 3 retry attempts with exponential backoff (2s, 4s, 8s)

✅ **Timeout Protection**: Requests timeout after 15 seconds to prevent hanging

✅ **Better Error Messages**: User-friendly error messages instead of technical jargon

✅ **Server Error Handling**: Automatically retries on 500, 502, 503, 504 errors

✅ **Network Error Recovery**: Handles connection resets and timeouts gracefully

### Other Common Issues

#### CORS Errors
**Solution:** Make sure the backend server is running on port 5000

#### Port Already in Use
**Solution:** 
1. Stop any other services using ports 5000 or 5173
2. Or change the ports in `.env` files

#### Module Not Found
**Solution:**
```powershell
npm run install:all
```

#### Frontend Can't Connect to Backend
**Solution:**
1. Verify backend is running: http://localhost:5000/api/health
2. Check `VITE_API_URL` in `frontend/.env` is correct
3. Restart both servers

### Testing the Fix

1. **Start both servers:**
   ```powershell
   npm run dev
   ```

2. **Try a search:**
   - Open http://localhost:5173
   - Search for "chocolate" or "bread"
   - The system will now automatically retry if it fails

3. **Check backend logs:**
   - You should see retry messages if the API is slow
   - Example: `Server error (504). Retrying in 2000ms...`

### API Status

The Open Food Facts API (world.openfoodfacts.org) is:
- Free and open source
- Community-maintained
- Can be slow during peak hours
- May occasionally return 504 errors

This is normal for free APIs. Our backend now handles these situations gracefully.

### Performance Tips

1. **Use the cache**: Search for the same term twice to use cached results
2. **Be specific**: More specific searches return faster results
3. **Popular items**: Well-known brands respond faster
4. **Off-peak hours**: API is faster during off-peak hours (late night/early morning)

### Still Having Issues?

If problems persist:

1. **Check API status directly:**
   ```
   https://world.openfoodfacts.org/cgi/search.pl?search_terms=chocolate&json=1
   ```

2. **Clear backend cache:**
   ```powershell
   # In another terminal or via Postman
   POST http://localhost:5000/api/foods/cache/clear
   ```

3. **Restart both servers:**
   ```powershell
   # Stop current servers (Ctrl+C)
   npm run dev
   ```

4. **Check backend logs** in the terminal for detailed error information

## Error Response Codes

| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad Request | Check your search query |
| 404 | Not Found | Item doesn't exist |
| 429 | Too Many Requests | Wait and retry |
| 500 | Server Error | Backend issue, retry |
| 503 | Service Unavailable | API is down, wait |
| 504 | Gateway Timeout | API is slow, system retries automatically |

## Need More Help?

Check these files:
- `README.md` - Project overview
- `SETUP.md` - Setup instructions
- `MIGRATION.md` - Architecture details
