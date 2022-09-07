package com.example.StudentMnServer;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JWTTokenHelper {

  // @Value("${jwt.auth.app}")
  private String appName = "studentMn";

  // @Value("${jwt.auth.secret_key}")
  private String secretKey = "studentapp";

  // @Value("${jwt.auth.expires_in}")
  private int expiresIn = 3600;

  private SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

  private Claims getAllClaimsFromToken(String token) {

    Claims claims;
    try {
      claims =
        Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    } catch (Exception e) {
      e.printStackTrace();

      claims = null;
    }
    return claims;
  }

  public String getUsernameFromToken(String token) {
    String username;


    try {
      final Claims claims = this.getAllClaimsFromToken(token);
     
      username = claims.getSubject();
    } catch (Exception e) {
      e.printStackTrace();

      username = null;
    }
    return username;
  }

  public String generateToken(String username)
    throws InvalidKeySpecException, NoSuchAlgorithmException {
    return Jwts
      .builder()
      .setIssuer(appName)
      .setSubject(username)
      .setIssuedAt(new Date())
      .setExpiration(generateExpirationDate())
      .signWith(SIGNATURE_ALGORITHM, secretKey)
      .compact();
  }

  private Date generateExpirationDate() {
    return new Date(new Date().getTime() + expiresIn * 1000);
  }

  public Boolean validateToken(String token, UserDetails userDetails) {
    final String username = getUsernameFromToken(token);
    return (
      username != null &&
      username.equals(userDetails.getUsername()) &&
      !isTokenExpired(token)
    );
  }

  public boolean isTokenExpired(String token) {
    Date expireDate = getExpirationDate(token);
    return expireDate.before(new Date());
  }

  private Date getExpirationDate(String token) {
    Date expireDate;
    try {
      final Claims claims = this.getAllClaimsFromToken(token);
      expireDate = claims.getExpiration();
    } catch (Exception e) {
      expireDate = null;
    }
    return expireDate;
  }

  public Date getIssuedAtDateFromToken(String token) {
    Date issueAt;
    try {
      final Claims claims = this.getAllClaimsFromToken(token);
      issueAt = claims.getIssuedAt();
    } catch (Exception e) {
      issueAt = null;
    }
    return issueAt;
  }

  public String getToken(HttpServletRequest request) {
    String authHeader = getAuthHeaderFromHeader(request);
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      System.out.println(authHeader.substring(7));
      return authHeader.substring(7);
    }

    return null;
  }

  public String getAuthHeaderFromHeader(HttpServletRequest request) {
    System.out.println(
      "REQUEST HEADER:" + request.getHeader("Authorization")
    );
    return request.getHeader("Authorization");
  }
}
