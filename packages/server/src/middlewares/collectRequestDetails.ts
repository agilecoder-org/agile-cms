import { Request, Response, NextFunction } from "express";
import useragent from "express-useragent";
import requestIp from "request-ip";
import { ExtendedRequest } from "../domains/user/types";

const collectRequestDetails = (req: Request, res: Response, next: NextFunction) => {
  const clientIp = requestIp.getClientIp(req);
  const ua = useragent.parse((req as any).headers["user-agent"]);

  (req as ExtendedRequest).requestDetails = {
    ip: clientIp || "",
    browser: ua.browser,
    browser_version: ua.version,
    os: ua.os,
    platform: ua.platform,
    is_mobile: ua.isMobile,
    is_desktop: ua.isDesktop,
    is_tablet: ua.isTablet,
  };

  next();
};

export default collectRequestDetails;
