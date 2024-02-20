from http.server import HTTPServer, CGIHTTPRequestHandler

class CORSHTTPRequestHandler(CGIHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

server_address = ('', 8000)
httpd = HTTPServer(server_address, CORSHTTPRequestHandler)
httpd.serve_forever()