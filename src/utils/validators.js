/**
 * 通用校验规则工具文件
 * 提供常用的数据格式校验方法
 *
 * ========================================
 * 📋 校验方法使用统计表
 * ========================================
 *
 * 🔍 表单校验方法（用于 Element Plus rules）：
 * - 名称校验：validator: validators.name（示例：张三_abc-123）通过
 * - 邮箱校验：validator: validators.email（示例：user@test.com）通过
 * - 手机号校验：validator: validators.phone（示例：13800138000）通过
 * - 网站地址校验：validator: validators.website（示例：https://example.com）通过
 * - 文件夹路径校验：validator: validators.folderPath（示例：/csa/app）通过
 * - 单IP校验：validator: validators.singleIP（示例：192.168.10.1）通过
 * - 单端口校验：validator: validators.singlePort（示例：8080）通过
 * - 校验多IP：validator: validators.ipList（示例：["10.0.0.1", "192.168.1.1"]) 通过
 * - 校验多端口：validator: validators.portList（示例：[80, 443, 8080]）通过
 * - 单个IP:端口：validator: validators.singleIpPort（示例：192.168.10.11:3001）通过
 * - 多个IP:端口：validator: validators.ipPortList（示例：["10.0.0.1:3002", "192.168.1.1:8080"]）通过
 * - 多个文件夹路径：validator: validators.folderPathList（示例：["csal/api", "csa/list"]）通过
 * - 身份证号校验：validator: validators.idCard（示例：110101199001011234）通过
 * - 银行卡号校验：validator: validators.bankCard（示例：6222021234567890123）通过
 * - 邮政编码校验：validator: validators.postalCode（示例：100000）通过
 * - MAC地址校验：validator: validators.macAddress（示例：00:1A:2B:3C:4D:5E）通过
 * - 中文姓名校验：validator: validators.chineseName（示例：张三）通过
 * - 英文姓名校验：validator: validators.englishName（示例：John-Doe）通过
 * - 密码强度校验：validator: validators.strongPassword（示例：Aa123456!  至少8位，包含大小写字母、数字、特殊字符）通过
 * - 纯数字校验：validator: validators.digitsOnly（示例："123456"）通过
 * - 纯字母校验：validator: validators.lettersOnly（示例："abcXYZ"）通过
 * - 纯中文校验：validator: validators.chineseOnly（示例：中文测试）通过
 * - 起始值（数字）：validator: validators.startValue
 * - 结束值（>起始值）：validator: (r,v,cb)=>validators.endValue(r,v,cb, form.startValue) 第四参传入起始值本身
 * - 起始IP（IPv4）：validator: validators.startIP
 * - 结束IP（>=起始IP，IPv4）：validator: (r,v,cb)=>validators.endIP(r,v,cb, form.startIP) 第四参传入起始IP本身
 * - 起始端口：validator: validators.startPort
 * - 结束端口（>起始端口）：validator: (r,v,cb)=>validators.endPort(r,v,cb, form.startPort) 第四参传入起始端口本身
 *
 * 🛠️ 工具校验方法（用于程序化校验）：
 * - 单个IP校验：validators.isValidIP(value)
 * - 单个端口校验：validators.isValidPort(value)
 * - 邮箱格式校验：validators.isValidEmail(value)
 * - 手机号校验：validators.isValidPhone(value)
 * - 网站地址校验：validators.isValidUrl(value)
 * - 文件夹路径校验：validators.isValidFolderPath(value)
 * - 特殊字符校验：validators.hasNoSpecialChars(value)
 * - 身份证号校验：validators.isValidIdCard(value)
 * - 银行卡号校验：validators.isValidBankCard(value)
 * - 邮政编码校验：validators.isValidPostalCode(value)
 * - MAC地址校验：validators.isValidMacAddress(value)
 * - 中文姓名校验：validators.isValidChineseName(value)
 * - 英文姓名校验：validators.isValidEnglishName(value)
 * - 密码强度校验：validators.isValidStrongPassword(value)
 * - 纯数字校验：validators.isDigitsOnly(value)
 * - 纯字母校验：validators.isLettersOnly(value)
 * - 纯中文校验：validators.isChineseOnly(value)
 * - 批量IP校验：validators.validateIPList(ipArray, maxCount)
 * - 批量端口校验：validators.validatePortList(portArray, maxCount)
 * - 批量文件夹路径校验：validators.validateFolderPathList(pathArray, maxCount)
 *
 * 📝 使用示例：
 * ```javascript
 * // 在 Element Plus 表单 rules 中使用
 * const rules = {
 *   name: [{ validator: validators.name, trigger: 'blur' }],
 *   singleIP: [{ validator: validators.singleIP, trigger: 'blur' }],
 *   singlePort: [{ validator: validators.singlePort, trigger: 'blur' }],
 *   idCard: [{ validator: validators.idCard, trigger: 'blur' }],
 *   bankCard: [{ validator: validators.bankCard, trigger: 'blur' }],
 *   ipList: [{ validator: validators.ipList, trigger: 'blur' }],
 *   portList: [{ validator: validators.portList, trigger: 'blur' }],
 *   folderPathList: [{ validator: validators.folderPathList, trigger: 'blur' }]
 * }
 *
 * // 程序化校验
 * if (validators.isValidIP('192.168.1.1')) {
 *   console.log('IP地址有效')
 * }
 * if (validators.isValidIdCard('110101199001011234')) {
 *   console.log('身份证号有效')
 * }
 * ```
 * ========================================
 */

// 正则表达式常量
export const REGEX = {
  // IPv4 地址校验
  IPV4: /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/,

  // IPv6 地址校验（简化版）
  IPV6: /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/,

  // 端口号校验（0-65535）
  PORT: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,

  // 邮箱校验
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // 手机号校验（中国大陆）
  PHONE: /^1[3-9]\d{9}$/,

  // 固定电话校验（中国大陆，支持区号-号码-分机格式）
  TEL: /^0\d{2,3}-?\d{7,8}(-\d{1,6})?$/,

  // 网站地址校验（支持 http/https）
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,

  // 文件夹路径校验（必须以 / 开头，支持多级目录）
  FOLDER_PATH: /^\/[a-zA-Z0-9_\-\/]+$/,

  // 文件夹路径校验（支持相对路径和绝对路径，支持多级目录）
  FOLDER_PATH_FLEXIBLE: /^(\/)?[a-zA-Z0-9_\-\/]+$/,

  // 不包含特殊字符（仅允许中文、英文、数字、下划线、连字符、空格）
  NO_SPECIAL_CHARS: /^[\u4e00-\u9fa5a-zA-Z0-9_\-\s]+$/,

  // 身份证号校验（中国大陆）
  ID_CARD:
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

  // 银行卡号校验（13-19位数字）
  BANK_CARD: /^[1-9]\d{12,18}$/,

  // 邮政编码校验（中国大陆）
  POSTAL_CODE: /^[1-9]\d{5}$/,

  // MAC地址校验
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,

  // 中文姓名校验（2-4个中文字符）
  CHINESE_NAME: /^[\u4e00-\u9fa5]{2,4}$/,

  // 英文姓名校验（2-50个英文字符，支持空格和连字符）
  ENGLISH_NAME: /^[a-zA-Z\s\-]{2,50}$/,

  // 密码强度校验（至少8位，包含大小写字母、数字、特殊字符）
  STRONG_PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // 纯数字校验
  DIGITS_ONLY: /^\d+$/,

  // 纯字母校验
  LETTERS_ONLY: /^[a-zA-Z]+$/,

  // 纯中文校验
  CHINESE_ONLY: /^[\u4e00-\u9fa5]+$/,
};

// 校验函数集合
export const validators = {
  /**
   * 单个 IP:端口 校验（支持 IPv4/IPv6）
   * 形式：IPv4:port 或 [IPv6]:port
   */
  singleIpPort(rule, value, callback) {
    if (!value) return callback();
    const raw = String(value).trim();
    // IPv6 需要中括号包裹，[::1]:8080
    const ipv6Match = raw.match(/^\[([^\]]+)\]:(\d{1,5})$/);
    const ipv4Match = raw.match(/^([^:\[\]]+):(\d{1,5})$/);
    let ip = "";
    let portStr = "";
    if (ipv6Match) {
      ip = ipv6Match[1];
      portStr = ipv6Match[2];
      if (!validators.isValidIPv6(ip))
        return callback(new Error("无效的IPv6地址"));
    } else if (ipv4Match) {
      ip = ipv4Match[1];
      portStr = ipv4Match[2];
      if (!validators.isValidIPv4(ip))
        return callback(new Error("无效的IPv4地址"));
    } else {
      return callback(new Error("格式应为IPv4:端口 或 [IPv6]:端口"));
    }

    if (/^0\d+$/.test(portStr))
      return callback(new Error(`端口不允许前导零：${portStr}`));
    if (!validators.isValidPort(portStr))
      return callback(new Error("端口无效（0~65535）"));
    return callback();
  },

  /**
   * 多个 IP:端口 校验（数组）
   */
  ipPortList(rule, value, callback) {
    // 非必填：空值放行
    if (!Array.isArray(value) || value.length === 0) return callback();
    for (let i = 0; i < value.length; i++) {
      const item = String(value[i]).trim();
      // 中文冒号提示
      if (item.includes("：")) {
        return callback(
          new Error(`第 ${i + 1} 项格式错误：${item} 请使用英文 : 冒号`)
        );
      }
      const ipv6Match = item.match(/^\[([^\]]+)\]:(\d{1,5})$/);
      const ipv4Match = item.match(/^([^:\[\]]+):(\d{1,5})$/);
      let ip = "";
      let portStr = "";
      if (ipv6Match) {
        ip = ipv6Match[1];
        portStr = ipv6Match[2];
        if (!validators.isValidIPv6(ip))
          return callback(
            new Error(
              `第 ${i + 1} 项格式错误：${ip} 格式应为IPv4:端口 或 [IPv6]:端口`
            )
          );
      } else if (ipv4Match) {
        ip = ipv4Match[1];
        portStr = ipv4Match[2];
        // IPv4 前导零检查
        const segs = ip.split(".");
        if (
          segs.length === 4 &&
          segs.some((seg) => seg.length > 1 && /^0\d+$/.test(seg))
        ) {
          return callback(
            new Error(
              `第 ${
                i + 1
              } 项格式错误：${item} IP不允许前导0，格式应为IPv4:端口 或 [IPv6]:端口`
            )
          );
        }
        if (!validators.isValidIPv4(ip))
          return callback(
            new Error(
              `第 ${i + 1} 项格式错误：${ip}，格式应为IPv4:端口 或 [IPv6]:端口`
            )
          );
      } else {
        return callback(
          new Error(
            `第 ${i + 1} 项格式错误：${item}，格式应为IPv4:端口 或 [IPv6]:端口`
          )
        );
      }

      if (/^0\d+$/.test(portStr))
        return callback(
          new Error(
            `第 ${
              i + 1
            } 项格式错误：${item} 端口不允许前导0，格式应为IPv4:端口 或 [IPv6]:端口`
          )
        );
      if (!validators.isValidPort(portStr))
        return callback(new Error(`无效端口：${portStr}（0~65535）`));
    }
    return callback();
  },
  // ========== 区间起止（数值/IP/端口）相关 ==========
  /**
   * 起始值：必须为数字
   */
  startValue(rule, value, callback) {
    if (value === "" || value === null || value === undefined)
      return callback();
    const n = Number(value);
    if (!Number.isFinite(n)) return callback(new Error("起始值必须为数字"));
    return callback();
  },

  /**
   * 结束值：必须为数字，且 > 起始值
   * 第四参传入起始值本身：endValue(rule, value, cb, startValue)
   */
  endValue(rule, value, callback, startValue) {
    if (value === "" || value === null || value === undefined)
      return callback();
    const endNum = Number(value);
    if (!Number.isFinite(endNum))
      return callback(new Error("结束值必须为数字"));
    const startNum = Number(startValue);
    if (!Number.isFinite(startNum))
      return callback(new Error("请先填写起始值"));
    if (!(endNum > startNum))
      return callback(new Error("结束值必须大于起始值"));
    return callback();
  },

  /**
   * 起始IP：必须为有效 IP（IPv4/IPv6 均可）
   */
  startIP(rule, value, callback) {
    if (!value) return callback();
    // IPv4 段前导零
    if (value.includes(".")) {
      const segs = value.split(".");
      if (
        segs.length === 4 &&
        segs.some((seg) => seg.length > 1 && /^0\d+$/.test(seg))
      ) {
        return callback(new Error(`IP不允许前导0，格式应为IPv4 或 IPv6`));
      }
    }
    if (!validators.isValidIP(value))
      return callback(new Error("格式应为IPv4 或 IPv6"));
    return callback();
  },

  /**
   * 结束IP：必须为有效 IP（IPv4/IPv6），且 >= 起始IP（同协议族按数值比较）
   * 第四参传入起始IP本身：endIP(rule, value, cb, startIP)
   */
  endIP(rule, value, callback, startIP) {
    if (!value) return callback();
    // IPv4 段前导零
    if (value.includes(".")) {
      const segs = value.split(".");
      if (
        segs.length === 4 &&
        segs.some((seg) => seg.length > 1 && /^0\d+$/.test(seg))
      ) {
        return callback(new Error(`IP不允许前导0，格式应为IPv4 或 IPv6`));
      }
    }
    if (!validators.isValidIP(value))
      return callback(new Error("格式应为IPv4 或 IPv6"));
    const start = startIP;
    if (!start || !validators.isValidIP(start))
      return callback(new Error("请先填写起始IP"));

    const isV4 = (ip) => REGEX.IPV4.test(ip);
    const isV6 = (ip) => REGEX.IPV6.test(ip);
    if ((isV4(start) && isV6(value)) || (isV6(start) && isV4(value))) {
      return callback(
        new Error("起始IP与结束IP协议不一致（需同为IPv4或IPv6）")
      );
    }

    const v4ToNum = (ip) =>
      ip.split(".").reduce((acc, seg) => (acc << 8n) + BigInt(Number(seg)), 0n);
    const expandV6 = (ip) => {
      const parts = ip.split("::");
      if (parts.length > 2) return null;
      const head = parts[0] ? parts[0].split(":").filter(Boolean) : [];
      const tail = parts[1] ? parts[1].split(":").filter(Boolean) : [];
      const missing = 8 - (head.length + tail.length);
      if (missing < 0) return null;
      return [...head, ...Array(missing).fill("0"), ...tail].map(
        (x) => x || "0"
      );
    };
    const v6ToNum = (ip) => {
      const segs = expandV6(ip);
      if (!segs || segs.length !== 8) return null;
      return segs.reduce(
        (acc, seg) => (acc << 16n) + BigInt(parseInt(seg, 16)),
        0n
      );
    };

    if (isV4(start)) {
      if (v4ToNum(value) < v4ToNum(start))
        return callback(new Error("结束IP必须不小于起始IP"));
    } else {
      const a = v6ToNum(start);
      const b = v6ToNum(value);
      if (a === null || b === null)
        return callback(new Error("IP地址解析失败"));
      if (b < a) return callback(new Error("结束IP必须不小于起始IP"));
    }
    return callback();
  },

  /**
   * 起始端口：必须为有效端口（0-65535），且不允许前导零（除0）
   */
  startPort(rule, value, callback) {
    if (value === "" || value === null || value === undefined)
      return callback();
    if (typeof value === "string" && /^0\d+$/.test(value.trim())) {
      return callback(new Error(`端口不允许前导零：${value}`));
    }
    if (!validators.isValidPort(value))
      return callback(new Error("起始端口无效（0~65535）"));
    return callback();
  },

  /**
   * 结束端口：必须为有效端口，且 > 起始端口
   * 第四参传入起始端口本身：endPort(rule, value, cb, startPort)
   */
  endPort(rule, value, callback, startPort) {
    if (value === "" || value === null || value === undefined)
      return callback();
    if (typeof value === "string" && /^0\d+$/.test(value.trim())) {
      return callback(new Error(`端口不允许前导零：${value}`));
    }
    if (!validators.isValidPort(value))
      return callback(new Error("结束端口无效（0~65535）"));
    const start = startPort;
    if (start === "" || start === null || start === undefined)
      return callback(new Error("请先填写起始端口"));
    if (!validators.isValidPort(start))
      return callback(new Error("起始端口无效（0~65535）"));
    if (Number(value) <= Number(start))
      return callback(new Error("结束端口必须大于起始端口"));
    return callback();
  },
  /**
   * IPv4 地址校验
   * @param {string} value - 待校验的IP地址
   * @returns {boolean} 是否为有效的IPv4地址
   */
  isValidIPv4(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.IPV4.test(value.trim());
  },

  /**
   * IPv6 地址校验
   * @param {string} value - 待校验的IP地址
   * @returns {boolean} 是否为有效的IPv6地址
   */
  isValidIPv6(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.IPV6.test(value.trim());
  },

  /**
   * IP地址校验（支持IPv4和IPv6）
   * @param {string} value - 待校验的IP地址
   * @returns {boolean} 是否为有效的IP地址
   */
  isValidIP(value) {
    return validators.isValidIPv4(value) || validators.isValidIPv6(value);
  },

  /**
   * 端口号校验
   * @param {string|number} value - 待校验的端口号
   * @returns {boolean} 是否为有效的端口号（0-65535）
   */
  isValidPort(value) {
    if (value === "" || value === null || value === undefined) return false;
    const port = Number(value);
    return Number.isInteger(port) && port >= 0 && port <= 65535;
  },

  /**
   * 邮箱地址校验
   * @param {string} value - 待校验的邮箱地址
   * @returns {boolean} 是否为有效的邮箱地址
   */
  isValidEmail(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.EMAIL.test(value.trim());
  },

  /**
   * 手机号校验（中国大陆）
   * @param {string} value - 待校验的手机号
   * @returns {boolean} 是否为有效的手机号
   */
  isValidPhone(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.PHONE.test(value.trim());
  },

  /**
   * 固定电话校验（中国大陆）
   * @param {string} value - 待校验的固定电话
   * @returns {boolean} 是否为有效的固定电话
   */
  isValidTel(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.TEL.test(value.trim());
  },

  /**
   * 网站地址校验
   * @param {string} value - 待校验的网站地址
   * @returns {boolean} 是否为有效的网站地址
   */
  isValidUrl(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.URL.test(value.trim());
  },

  /**
   * 文件夹路径校验
   * @param {string} value - 待校验的文件夹路径
   * @returns {boolean} 是否为有效的文件夹路径
   */
  isValidFolderPath(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.FOLDER_PATH.test(value.trim());
  },

  /**
   * 文件夹路径校验（支持相对路径和绝对路径）
   * @param {string} value - 待校验的文件夹路径
   * @returns {boolean} 是否为有效的文件夹路径
   */
  isValidFolderPathFlexible(value) {
    if (!value || typeof value !== "string") return false;
    const trimmed = value.trim();
    // 不允许空字符串、单独的斜杠、连续斜杠、或以斜杠结尾（除非是根路径）
    if (
      trimmed === "" ||
      trimmed === "/" ||
      /\/{2,}/.test(trimmed) ||
      /\/$/.test(trimmed)
    ) {
      return false;
    }
    return REGEX.FOLDER_PATH_FLEXIBLE.test(trimmed);
  },

  /**
   * 特殊字符校验（不允许特殊字符）
   * @param {string} value - 待校验的字符串
   * @returns {boolean} 是否不包含特殊字符
   */
  hasNoSpecialChars(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.NO_SPECIAL_CHARS.test(value.trim());
  },

  /**
   * 身份证号校验
   * @param {string} value - 待校验的身份证号
   * @returns {boolean} 是否为有效的身份证号
   */
  isValidIdCard(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.ID_CARD.test(value.trim());
  },

  /**
   * 银行卡号校验
   * @param {string} value - 待校验的银行卡号
   * @returns {boolean} 是否为有效的银行卡号
   */
  isValidBankCard(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.BANK_CARD.test(value.trim());
  },

  /**
   * 邮政编码校验
   * @param {string} value - 待校验的邮政编码
   * @returns {boolean} 是否为有效的邮政编码
   */
  isValidPostalCode(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.POSTAL_CODE.test(value.trim());
  },

  /**
   * MAC地址校验
   * @param {string} value - 待校验的MAC地址
   * @returns {boolean} 是否为有效的MAC地址
   */
  isValidMacAddress(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.MAC_ADDRESS.test(value.trim());
  },

  /**
   * 中文姓名校验
   * @param {string} value - 待校验的中文姓名
   * @returns {boolean} 是否为有效的中文姓名
   */
  isValidChineseName(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.CHINESE_NAME.test(value.trim());
  },

  /**
   * 英文姓名校验
   * @param {string} value - 待校验的英文姓名
   * @returns {boolean} 是否为有效的英文姓名
   */
  isValidEnglishName(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.ENGLISH_NAME.test(value.trim());
  },

  /**
   * 密码强度校验
   * @param {string} value - 待校验的密码
   * @returns {boolean} 是否为有效的密码强度
   */
  isValidStrongPassword(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.STRONG_PASSWORD.test(value.trim());
  },

  /**
   * 纯数字校验
   * @param {string} value - 待校验的字符串
   * @returns {boolean} 是否为纯数字
   */
  isDigitsOnly(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.DIGITS_ONLY.test(value.trim());
  },

  /**
   * 纯字母校验
   * @param {string} value - 待校验的字符串
   * @returns {boolean} 是否为纯字母
   */
  isLettersOnly(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.LETTERS_ONLY.test(value.trim());
  },

  /**
   * 纯中文校验
   * @param {string} value - 待校验的字符串
   * @returns {boolean} 是否为纯中文
   */
  isChineseOnly(value) {
    if (!value || typeof value !== "string") return false;
    return REGEX.CHINESE_ONLY.test(value.trim());
  },

  /**
   * 数组形式的IP地址校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {Array} value - IP地址数组
   * @param {Function} callback - Element Plus回调函数
   */
  ipList(rule, value, callback) {
    // 非必填：当值为空或非数组时直接放行，由 required 规则控制是否必填
    if (!Array.isArray(value) || value.length === 0) return callback();

    if (value.length > 5) {
      return callback(new Error("最多填写 5 个 IP"));
    }

    for (let i = 0; i < value.length; i++) {
      const item = String(value[i]).trim();
      // IPv4 段前导零
      if (item.includes(".")) {
        const segs = item.split(".");
        if (
          segs.length === 4 &&
          segs.some((seg) => seg.length > 1 && /^0\d+$/.test(seg))
        ) {
          return callback(
            new Error(
              `第 ${
                i + 1
              } 项格式错误：${item} IP不允许前导0，格式应为IPv4 或 IPv6`
            )
          );
        }
      }
      if (!validators.isValidIP(item)) {
        return callback(
          new Error(`第 ${i + 1} 项格式错误：${item}，格式应为IPv4 或 IPv6`)
        );
      }
    }

    return callback();
  },

  /**
   * 数组形式的端口号校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {Array} value - 端口号数组
   * @param {Function} callback - Element Plus回调函数
   */
  portList(rule, value, callback) {
    // 非必填：当值为空或非数组时直接放行，由 required 规则控制是否必填
    if (!Array.isArray(value) || value.length === 0) return callback();

    if (value.length > 6) {
      return callback(new Error("最多填写 6 个端口"));
    }

    for (let i = 0; i < value.length; i++) {
      const port = value[i];
      // 禁止前导零（允许值为"0"本身）
      if (typeof port === "string" && /^0\d+$/.test(port.trim())) {
        return callback(new Error(`端口不允许前导零：${port}`));
      }
      if (!validators.isValidPort(port)) {
        return callback(new Error(`无效的端口：${port}（范围 0~65535）`));
      }
    }

    return callback();
  },

  /**
   * 数组形式的文件夹路径校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {Array} value - 文件夹路径数组
   * @param {Function} callback - Element Plus回调函数
   */
  folderPathList(rule, value, callback) {
    // 非必填：当值为空或非数组时直接放行，由 required 规则控制是否必填
    if (!Array.isArray(value) || value.length === 0) return callback();

    if (value.length > 10) {
      return callback(new Error("最多填写 10 个文件夹路径"));
    }

    for (let i = 0; i < value.length; i++) {
      const item = String(value[i]).trim();
      if (!validators.isValidFolderPathFlexible(item)) {
        return callback(
          new Error(
            `第 ${
              i + 1
            } 项格式错误：${item}，格式应为文件夹路径，如：csa/app 或 /csa/app`
          )
        );
      }
    }

    return callback();
  },

  /**
   * 名称校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 名称值
   * @param {Function} callback - Element Plus回调函数
   */
  name(rule, value, callback) {
    if (!value) return callback();
    if (value.length > 128)
      return callback(new Error("名称不能超过 128 个字符"));
    if (!validators.hasNoSpecialChars(value))
      return callback(new Error("名称不能包含特殊字符"));
    return callback();
  },

  /**
   * 邮箱校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 邮箱值
   * @param {Function} callback - Element Plus回调函数
   */
  email(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidEmail(value))
      return callback(new Error("请输入有效的邮箱地址"));
    return callback();
  },

  /**
   * 手机号校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 手机号值
   * @param {Function} callback - Element Plus回调函数
   */
  phone(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidPhone(value))
      return callback(new Error("请输入有效的手机号"));
    return callback();
  },

  /**
   * 网站地址校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 网站地址值
   * @param {Function} callback - Element Plus回调函数
   */
  website(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidUrl(value))
      return callback(
        new Error("请输入有效的网站地址，如：https://example.com")
      );
    return callback();
  },

  /**
   * 文件夹路径校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 文件夹路径值
   * @param {Function} callback - Element Plus回调函数
   */
  folderPath(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidFolderPath(value))
      return callback(new Error("请输入有效的文件夹路径，如：/csa/app"));
    return callback();
  },

  /**
   * 单个IP地址校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - IP地址值
   * @param {Function} callback - Element Plus回调函数
   */
  singleIP(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidIP(value))
      return callback(new Error("请输入有效的IP地址"));
    return callback();
  },

  /**
   * 单个端口号校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string|number} value - 端口号值
   * @param {Function} callback - Element Plus回调函数
   */
  singlePort(rule, value, callback) {
    if (!value) return callback();
    // 禁止前导零（允许值为"0"本身）
    if (typeof value === "string" && /^0\d+$/.test(value.trim())) {
      return callback(new Error("端口不允许前导零"));
    }
    if (!validators.isValidPort(value))
      return callback(new Error("请输入有效的端口号（范围：0-65535）"));
    return callback();
  },

  /**
   * 身份证号校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 身份证号值
   * @param {Function} callback - Element Plus回调函数
   */
  idCard(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidIdCard(value))
      return callback(new Error("请输入有效的身份证号"));
    return callback();
  },

  /**
   * 银行卡号校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 银行卡号值
   * @param {Function} callback - Element Plus回调函数
   */
  bankCard(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidBankCard(value))
      return callback(new Error("请输入有效的银行卡号"));
    return callback();
  },

  /**
   * 邮政编码校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 邮政编码值
   * @param {Function} callback - Element Plus回调函数
   */
  postalCode(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidPostalCode(value))
      return callback(new Error("请输入有效的邮政编码"));
    return callback();
  },

  /**
   * 中文姓名校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 中文姓名值
   * @param {Function} callback - Element Plus回调函数
   */
  chineseName(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidChineseName(value))
      return callback(new Error("请输入有效的中文姓名（2-4个字符）"));
    return callback();
  },

  /**
   * 英文姓名校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 英文姓名值
   * @param {Function} callback - Element Plus回调函数
   */
  englishName(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidEnglishName(value))
      return callback(new Error("请输入有效的英文姓名（2-50个字符）"));
    return callback();
  },

  /**
   * 密码强度校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 密码值
   * @param {Function} callback - Element Plus回调函数
   */
  strongPassword(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isValidStrongPassword(value))
      return callback(
        new Error("密码必须至少8位，包含大小写字母、数字和特殊字符")
      );
    return callback();
  },

  /**
   * 纯数字校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 字符串值
   * @param {Function} callback - Element Plus回调函数
   */
  digitsOnly(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isDigitsOnly(value))
      return callback(new Error("只能输入数字"));
    return callback();
  },

  /**
   * 纯字母校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 字符串值
   * @param {Function} callback - Element Plus回调函数
   */
  lettersOnly(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isLettersOnly(value))
      return callback(new Error("只能输入字母"));
    return callback();
  },

  /**
   * 纯中文校验（用于Element Plus表单校验）
   * @param {Object} rule - Element Plus校验规则对象
   * @param {string} value - 字符串值
   * @param {Function} callback - Element Plus回调函数
   */
  chineseOnly(rule, value, callback) {
    if (!value) return callback();
    if (!validators.isChineseOnly(value))
      return callback(new Error("只能输入中文字符"));
    return callback();
  },

  /**
   * 数组形式的IP地址校验
   * @param {Array} ipList - IP地址数组
   * @param {number} maxCount - 最大允许数量
   * @returns {Object} 校验结果 {valid: boolean, message: string}
   */
  validateIPList(ipList, maxCount = 10) {
    if (!Array.isArray(ipList)) {
      return { valid: false, message: "IP列表必须是数组格式" };
    }

    if (ipList.length === 0) {
      return { valid: false, message: "请输入至少一个IP地址" };
    }

    if (ipList.length > maxCount) {
      return { valid: false, message: `最多允许输入 ${maxCount} 个IP地址` };
    }

    for (let i = 0; i < ipList.length; i++) {
      const ip = ipList[i];
      if (!validators.isValidIP(ip)) {
        return { valid: false, message: `第 ${i + 1} 个IP地址无效：${ip}` };
      }
    }

    return { valid: true, message: "IP地址格式正确" };
  },

  /**
   * 数组形式的端口号校验
   * @param {Array} portList - 端口号数组
   * @param {number} maxCount - 最大允许数量
   * @returns {Object} 校验结果 {valid: boolean, message: string}
   */
  validatePortList(portList, maxCount = 10) {
    if (!Array.isArray(portList)) {
      return { valid: false, message: "端口列表必须是数组格式" };
    }

    if (portList.length === 0) {
      return { valid: false, message: "请输入至少一个端口号" };
    }

    if (portList.length > maxCount) {
      return { valid: false, message: `最多允许输入 ${maxCount} 个端口号` };
    }

    for (let i = 0; i < portList.length; i++) {
      const port = portList[i];
      if (typeof port === "string" && /^0\d+$/.test(String(port).trim())) {
        return { valid: false, message: `端口不允许前导零：${port}` };
      }
      if (!validators.isValidPort(port)) {
        return {
          valid: false,
          message: `第 ${i + 1} 个端口号无效：${port}（范围：0-65535）`,
        };
      }
    }

    return { valid: true, message: "端口号格式正确" };
  },

  /**
   * 数组形式的文件夹路径校验
   * @param {Array} folderPathList - 文件夹路径数组
   * @param {number} maxCount - 最大允许数量
   * @returns {Object} 校验结果 {valid: boolean, message: string}
   */
  validateFolderPathList(folderPathList, maxCount = 10) {
    if (!Array.isArray(folderPathList)) {
      return { valid: false, message: "文件夹路径列表必须是数组格式" };
    }

    if (folderPathList.length === 0) {
      return { valid: false, message: "请输入至少一个文件夹路径" };
    }

    if (folderPathList.length > maxCount) {
      return { valid: false, message: `最多允许输入 ${maxCount} 个文件夹路径` };
    }

    for (let i = 0; i < folderPathList.length; i++) {
      const path = folderPathList[i];
      if (!validators.isValidFolderPathFlexible(path)) {
        return {
          valid: false,
          message: `第 ${
            i + 1
          } 个文件夹路径无效：${path}，格式应为文件夹路径，如：csa/app 或 /csa/app`,
        };
      }
    }

    return { valid: true, message: "文件夹路径格式正确" };
  },
};

// 默认导出
export default validators;
